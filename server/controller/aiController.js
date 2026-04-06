
export const suggestTitles = async (req, res, next) => {
    try {
        const { petId } = req.params;
        // const { content } = req.body;
        // if (!content || !content.trim()) {
        //     return next(new AppError("Content is required", 400))
        // };

        // hardcoded
        const titles = [
            "mock title 1",
            "mock title 2",
            "mock title 3",
            "mock title4"
        ];

        res.status(200).json({
            success: true,
            data: titles,
        });
    } catch (err) {
        next(err);
    }
};
