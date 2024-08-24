import Booking from "../models/Booking.js"
import Book from "../models/Book.js"
import User from "../models/User.js"



export const createBooking=async(req,res)=>{
    const bookId=req.body.bookId
    const userId=req.body.userId

    
    var returnDate=new Date().getTime()

    try {
        const book=await Book.findById(bookId)
        const avl=book.available
        if(avl<=0){
            return res.status(404).json({
                success:false,
                message:"Not available",
            })
        }

        const user=await User.findById(userId)
        const usertype=user.usertype

        const totalBookings=await Booking.countDocuments({userId:userId})


        if(usertype=='ugStudent'){
            if(totalBookings>=2){
                return res.status(404).json({
                    success:false,
                    message:"Can't borrow more than 2 books.",
                })
            }
            returnDate=returnDate+30*86400000
        }
        else if(usertype=='pgStudent'){
            if(totalBookings>=4){
                return res.status(404).json({
                    success:false,
                    message:"Can't borrow more than 4 books.",
                })
            }
            returnDate=returnDate+30*86400000
        }
        else if(usertype=='scholar'){
            if(totalBookings>=6){
                return res.status(404).json({
                    success:false,
                    message:"Can't borrow more than 6 books.",
                })
            }
            returnDate=returnDate+90*86400000

        }
        else if(usertype=='faculty'){
            if(totalBookings>=10){
                return res.status(404).json({
                    success:false,
                    message:"Can't borrow more than 10 books.",
                })
            }
            returnDate=returnDate+180*86400000
        }
        else{
            return res.status(404).json({
                success:false,
                message:"You are not authorized to borrow books.",
            })
        }
        const newObj={returnDate:new Date(returnDate).toISOString()}
        const bookingObject={...req.body,...newObj}
        const newBooking=new Booking(bookingObject)
        const savedBooking= await newBooking.save()
        await Book.findByIdAndUpdate(bookId, {$inc:{available:-1}})

        res.status(200).json({
            success:true,
            message:"Borrowed",
            data:savedBooking 
        })

    } catch (error) {
        res.status(500).json({ 
            success:true,
            message:error.message
        })
    }
}

export const getUserBookings=async(req,res)=>{
    const userId=req.params.userId

    try {
        
        const bookings=await Booking.find({userId:userId}).populate('bookId')
        
                res.status(200).json({
                    size:bookings.length,
                    success:true,
                    message:"Successfull",
                    data:bookings
                })
        
            } catch (error) {
                res.status(404).json({
                    success:true,
                    message:error.message
                })
            }

}

export const getBooking=async(req,res)=>{
    const userId=req.params.userId
    const bookId=req.params.bookId

    try {
        
        const book=await Booking.find({$and:[{userId:userId},{bookId:bookId}]})

        res.status(200).json({
            success:true,
            message:"Successfull",
            data:book
        })

    } catch (error) {
        res.status(404).json({
            success:true,
            message:"not found"
        })
    }
}


export const getAllBooking=async(req,res)=>{

    try {
        
        const books=await Booking.find()

        res.status(200).json({
            success:true,
            message:"Successfull",
            size:books.length,
            data:books
        })

    } catch (error) {
        res.status(500).json({
            success:true,
            message:"internal server error"
        })
    }
}

export const deleteBooking=async(req,res)=>{
    const userId=req.body.userId
    const bookId=req.body.bookId        

    try {
        
        const booking=await Booking.find({$and:[{userId:userId},{bookId:bookId}]})
        var deletedBooking= {}
        if(booking.length){
           await Book.findByIdAndUpdate(bookId, {$inc:{available:1}})
            deletedBooking= await Booking.findByIdAndDelete(booking[0]._id).populate('bookId')
        }

        res.status(200).json({
            success:true,
            message:"Book Returned",
            data:deletedBooking
            // data:savedBooking 
        })

    } catch (error) {
        res.status(500).json({ 
            success:true,
            message:error.message
        })
    }
}


export const getBookingByBookId=async(req,res)=>{
    const bookId=req.params.bookId
    try {
        
        const books=await Booking.find({bookId:bookId})

        res.status(200).json({
            success:true,
            message:"Successfull",
            size:books.length,
            data:books
        })

    } catch (error) {
        res.status(500).json({
            success:true,
            message:"internal server error"
        })
    }
}