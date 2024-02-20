const Post = require("../models/postModel")


exports.getAllPosts = async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const searchTermOfTitle = req.query.searchTermOfTitle
    try {
        let query ={}
        if (searchTermOfTitle){
             query.title = {
                $regex: searchTermOfTitle,
                $options: 'i'
             }
        }
        const postsCount = await Post.countDocuments()
        const totalPages = Math.ceil(postsCount/limit)
        const posts = await Post.find(query).skip((page-1)* limit).limit(limit)
        res.status(200).json({
            totalPages,
            totalPosts: postsCount,
            currentPage: page,
            posts
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


exports.bulkupload = async (req,res)=>{
    try {
        const posts = req.body
        if(!Array.isArray(posts) || posts.length === 0){
            res.status(400).json({message: "Please send proper  data"})
            return
        }
        const  response = await Post.insertMany(posts);
        res.status(201).json({
            message:"Posts uploaded",
            data: response
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}