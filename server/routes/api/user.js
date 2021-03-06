import express from 'express'
import jwt from 'jsonwebtoken'
import eJWT from 'express-jwt'

import { AuthUserToken } from '../JWTprotectionMiddleware'

const router = express.Router()

const Item = class {
	constructor(id, itemName, info, lender, borrower, requestsForItem, isAvailable) {
		this.id =  0
		this.itemName = itemName
		this.info = ""
		this.lender = ""
		this.borrower = null
		this.requestsForItem = []
		this.isAvailable = true
	}
	addNewRequest(user) {
		this.requestsForItem.push(user)
	}
	removeRequest(user) {
		this.removeRequest.filter(us => user.name !== us.name)
	}
	lendItTo(user) {
		this.borrower = user.name
	}
	removeBorrower(){
		this.borrower = null
	} 
}


const id = 0

const User = {
	"name": "Viktor",
	"ListOfItemsYouLend": [id],
	"ListOfItemsBorrowed": [id]
}

const Items = [Item]





router.all('/', (req, res, next) => {
	const token = req.headers.token,
		token_verified = jwt.verify(token, 'test123', (err, decoded) => {
			if(err) console.log(err);
		})

	res.json({ 
		message: 'UserApi',
		token: token_verified
	})
	res.end()
})


router.post('/create', AuthUserToken, (req, res, next) => {
	res.cookie('user', 'viktor')
	res.json({ 
		test: '123',
		data: req.decodedToken
	})
})



export default router;