const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_QUIZ_DATABASE_ID),
  appwriteCollectionId: String(
    import.meta.env.VITE_APPWRITE_QUESTIONS_COLLECTION_ID
  ),
  appwriteStatsCollectionId: String(
    import.meta.env.VITE_APPWRITE_STATS_COLLECTION_ID
  ),
  // appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf
