
export const embedText = (text) => {
    if (!text || !text.trim()) {
        throw new Error("text cannot be emtpy")
    }

    return Array(1536).fill(0.01);

}