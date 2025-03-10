import videoModel from '../Models/video.model.js'

export const uploadVideo = async (req,res)=>{
    try{
        const {title,description, videoLink,videoType,} = req.body
        console.log(req.user)
    
        const videoUpload = new videoModel({
            user: req.user._id, 
            title,
            description,
            videoLink,
            videoType
        })

        await videoUpload.save();
         res.status(201).json({ sucess: "true", videoUpload });

        

    }catch(error){
       res.status(500).json({
        error: 'Server error'
       })
    }
}

export const getAllVideo = async (req,res)=>{
    try{
      const videos = await videoModel.find().populate('user', 'channelName,profilePic, email createdAt');
      res.status(201).json({success : true, "videos": videos})
    }catch(error){
        res.status(500).json({error: 'Server Error'})
    }

}

export const getVideoById = async (req,res)=>{
    try{
       let {id} = req.params
       const video = await videoModel.findById(id).populate('user', 'channelName,profilePic, email createdAt');
       res.status(201).json({
        success: 'true', 
        "video" : video
       })
    }catch(error){
        res.status(500).json({error: 'Server Error'})
    }

}

export const getAllVideoByUserId = async (req,res)=>{
    try{
        let {userId} = req.params
        const video = await videoModel.find({user: userId}).populate('user', 'channelName,profilePic, email createdAt');
        res.status(201).json({
            success: 'true', 
            "video" : video
           })
    
    }catch(error){
        res.status(500).json({error: 'Server Error'})
    }

}



