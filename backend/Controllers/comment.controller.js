import commentsModel from '../Models/comment.model.js'

export const addComment = async(req , res)=>{
    try{
        let {video,message} =  req.body
        const comment = new commentsModel({
            user:req.user._id,
            video,
            message
        })

        await comment.save();
        res.status(201).json({
            message: 'Success',
            comment
        })

    }catch(error){
        res.status(500).json({error: 'Server Error'})
    }
}

export const getCommentByVideoId = async(req , res)=>{
    try{
        let {videoId} = req.params
        const comments = await commentsModel.find({video : videoId}).populate('user', 'channelName,profilePic,email')

        res.status(201).json({
            message: 'Success',
            comments
        })

    }catch(error){
        res.status(500).json({error: 'Server Error'})
    }
}