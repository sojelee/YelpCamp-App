var mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    Comment   = require("./models/comment")
    
    
    var data = [
            {
                name:"Kalenga One Town",
                image:"https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg",
                description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more"
            },
            {
                name:"Lupembe One City",
                image:"https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
                description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
            },
            {
                name:"Kilindi City Par",
                image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
                description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
            }
            
        ]
    function seedDB(){
        
        // Removing Campgrounds
        Campground.remove({},(err)=>{
            if(err){
                console.log(err)
            }
                console.log("Campground removed");
                
                //   Inserting Campgrounds
       data.forEach(seed =>{
           Campground.create(seed, (err,campground)=>{
               if(err){
                   console.log(err)
                   
               }else{
                   console.log("campground seeded")
                   // create comment
                   
                   Comment.create({text:"This place is very nice, good and clean air, lots of cold streams make the place evergreen",author:"myalla"},(err,comment)=>{
                       
                       if(err){
                           console.log(err)
                       }else{
                          campground.comments.push(comment);
                          campground.save((err,data)=>{
                              if(err){
                                  console.log(err)
                              }else{
                                  console.log("comment saved")
                              }
                          })
                       }
                       
                   })
                   
               }
           })
       })
        });
    }
    
module.exports = seedDB;
    


