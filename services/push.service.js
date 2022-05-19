const { Expo } = require('expo-server-sdk')

class PushService {
  constructor() {
    this.expo = new Expo()
  }
  async pushNewMessage(pushTokens, message) {
    let messages = []
    for (let pushToken of pushTokens) {
      // Check that all push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`)
        continue
      }
      messages.push({
        to: pushToken,
        sound: 'default',
        title: message.author.username,
        body: message.text,
        data: { 
          chatId: message.chat._id,
          chatName: message.chat.title
        },
      })
    }
    const tickets = await this.getTickets(messages)
    this.getReceipts(tickets)
  }

  async getTickets(messages) {
    // The Expo push notification service accepts batches of notifications
    let chunks = this.expo.chunkPushNotifications(messages)
    const tickets = await this.sendChunks(chunks)
    return tickets
  }

  async sendChunks(chunks) {
    let tickets = []
    // Send the chunks to the Expo push notification service.
    for (let chunk of chunks) {
      try {
        let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk)
        tickets.push(...ticketChunk)
      } catch (error) {
        //TODO: Handle error ticket.details.error
        console.error(error)
      }
    }
    return tickets
  }
  async getReceipts(tickets) {
    let receiptIds = []
    for (let ticket of tickets) {
      // Tickets for notifications that could not be enqueued have error information and no receipt ID.
      if (ticket.id) {
        receiptIds.push(ticket.id)
      }
    }
    let receiptIdChunks = this.expo.chunkPushNotificationReceiptIds(receiptIds)
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await this.expo.getPushNotificationReceiptsAsync(chunk)

        for (let receiptId in receipts) {
          let { status, message, details } = receipts[receiptId]
          if (status === 'ok') {
            continue
          } else if (status === 'error') {
            console.error(
              `There was an error sending a notification: ${message}`
            )
            if (details && details.error) {
              //TODO: handle error
              console.error(`The error code is ${details.error}`)
            }
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}

module.exports = PushService
