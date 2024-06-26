import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query, Account } from 'appwrite'

export class Services {
  client = new Client()
  databases
  bucket
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createQuiz({ slug, name, difficulty, questions, status, userId }) {
    try {
      const Questions = JSON.stringify(questions)
      const id = ID.unique(slug)
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        {
          name,
          difficulty,
          Questions,
          status,
          userId,
        }
      )
      return id
    } catch (error) {
      console.log(error)
    }
  }

  async updateQuiz(
    quizname,
    { questions, options, answers, explanations, userId }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        quizname,
        { questions, options, answers, explanations, userId }
      )
    } catch (error) {
      console.log(error)
    }
  }

  async updateAttempts(slug, users) {
    const attemptedUsers = JSON.stringify(users)
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { attemptedUsers }
      )
    } catch (error) {
      console.log(error)
    }
  }

  async createStat(slug) {
    const userData = '[]'

    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteStatsCollectionId,
        slug,
        { userData }
      )
    } catch (error) {
      console.error('Error creating document:', error)
      return null
    }
  }

  async updateStats(slug, data) {
    const userData = JSON.stringify(data)
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteStatsCollectionId,
        slug,
        {
          userData,
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  async getStats(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteStatsCollectionId,
        slug
      )
    } catch (error) {
      console.log(error)
    }
  }

  async deleteQuiz(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      )
      return true
    } catch (error) {
      console.log(error)
    }
  }

  async getQuiz(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log(error)
    }
  }

  async getQuizes(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

const servies = new Services()

export default servies
