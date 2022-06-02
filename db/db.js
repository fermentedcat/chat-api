class Db {
  constructor(collection) {
    this.collection = collection
  }
  async find(query, populate) {
    try {
      const docs = await this.collection.find(query).populate(populate)
      return docs
    } catch (error) {
      throw error
    }
  }

  async findById(id, populate) {
    try {
      const doc = await this.collection.findById(id).populate(populate)
      return doc
    } catch (error) {
      throw error
    }
  }

  async findOne(query, populate, select) {
    try {
      const doc = await this.collection.findOne(query).populate(populate).select(select)
      return doc
    } catch (error) {
      throw error
    }
  }

  async create(data, populate) {
    try {
      const doc = await new this.collection(data).save()
      if (populate) {
        await doc.populate(populate)
      }
      return doc
    } catch (error) {
      throw error
    }
  }

  async findByIdAndUpdate(id, data, populate) {
    try {
      const doc = await this.collection.findByIdAndUpdate(id, data, { new: true }).populate(populate)
      return doc
    } catch (error) {
      throw error
    }
  }

  async findOneAndUpdate(query) {
    try {
      const doc = await this.collection.findOneAndUpdate(query)
      return doc
    } catch (error) {
      throw error
    }
  }

  async updateMany(query) {
    try {
      const docs = await this.collection.updateMany(query)
      return docs
    } catch (error) {
      throw error
    }
  }

  async findByIdAndDelete(id) {
    try {
      const doc = await this.collection.findByIdAndDelete(id)
      return doc
    } catch (error) {
      throw error
    }
  }

  async findOneAndDelete(query) {
    try {
      const doc = await this.collection.findOneAndDelete(query)
      return doc
    } catch (error) {
      throw error
    }
  }

  async deleteMany(query) {
    try {
      const docs = await this.collection.deleteMany(query)
      return docs
    } catch (error) {
      throw error
    }
  }
  
}

module.exports = Db