export const sortedConversations = (conversations) => {
    return conversations.sort((a,b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt))

}