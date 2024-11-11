'use client'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { Authenticate, initOTPless, verifyOTP } from '../utils/initOtpless'

export default function Home() {
	const [phone, setPhone] = useState('')
	const [otp, setOtp] = useState('')

	useEffect(() => initOTPless(callback), [])
	/** callback - otpless callback function
	 * @description
	 * This function is called after authentication is done, by otpless-sdk.
	 * Use this function to further process the otplessUser object, navigate to next page or perform any other action based on your requirement.
	 * @param {Object} otplessUser
	 * @returns {void}
	 */
	const callback = (otplessUser: Object): void => {
		// Replace the following code with your own logic
		console.log(otplessUser)
		console.log(JSON.stringify(otplessUser))
	}
	/** switchActiveSection - otpless callback function
	 * @description
	 * This function is called when the user changes the section from mobile to email.
	 * @param {event} e
	 * @returns {void}
	 * */
	

	return (
		<div className={styles.page}>
			<main
				className={styles.main + ' ' + styles.homePage}
				id='home-page'>
					<div id='mobile-section'>
						<input
							id='mobile-input'
							placeholder='Enter mobile number'
							onChange={e => setPhone(e.target.value)}
						/>
						<button
							onClick={() =>
								Authenticate({ channel: 'PHONE', phone }).then(res => {
									if (res.success) {
										console.info('Check your phone for OTP/Magic Link')
										document.getElementById('otp-section')!.style.display = 'block'
										;(document.getElementById('mobile-input') as HTMLInputElement).disabled = true
									}
								})
							}>
							Proceed
						</button>
					</div>
				
				<div
					id='otp-section'
					style={{ display: 'none' }}>
					<input
						id='otp-input'
						placeholder='Enter OTP'
						value={otp}
						onChange={e => setOtp(e.target.value)}
						minLength={6}
						maxLength={6}
					/>
					<button
						onClick={() =>
							verifyOTP({ channel: "PHONE", otp, phone}).then(res => {
								console.log(res)
								if (res.success) {
									;(document.getElementById('otp-input') as HTMLInputElement).disabled = true
									setOtp('Verified')
								}
								if (res.success == false){
									alert("Enter the correct Otp")
									setOtp('')
								}
							})
						}>
						Verify OTP
					</button>
				</div>
				
			</main>
		</div>
	)
}



// 'use client'
// import styles from './page.module.css'
// import { useEffect, useState } from 'react'
// import { Authenticate, initOTPless } from '../utils/initOtpless'

// export default function Home() {
// 	const [phone, setPhone] = useState('')
// 	const [email, setEmail] = useState('')
// 	const [otp, setOtp] = useState('')
// 	useEffect(() => initOTPless(callback), [])
// 	/** callback - otpless callback function
// 	 * @description
// 	 * This function is called after authentication is done, by otpless-sdk.
// 	 * Use this function to further process the otplessUser object, navigate to next page or perform any other action based on your requirement.
// 	 * @param {Object} otplessUser
// 	 * @returns {void}
// 	 */
// 	const callback = (otplessUser: Object): void => {
// 		// Replace the following code with your own logic
// 		console.log(otplessUser)
// 		alert(JSON.stringify(otplessUser))
// 	}
// 	/** switchActiveSection - otpless callback function
// 	 * @description
// 	 * This function is called when the user changes the section from mobile to email.
// 	 * @param {event} e
// 	 * @returns {void}
// 	 * */
	


// let OTPlessSignin: any = null

// /**
//  * Initializes the OTPless SDK and sets up a callback function.
//  *
//  * @param {function} callback - The callback function to be executed after successful authentication.
//  * @return {void} No return value.
//  */
//  	const initOTPless = (callback: Function): void => {
// 	const script: HTMLScriptElement = document.createElement('script')
// 	// Loading the script if it's not already loaded
// 	if (!document.getElementById('otpless-sdk')) {
// 		script.id = 'otpless-sdk'
// 		script.type = 'text/javascript'
// 		script.src = 'https://otpless.com/v3/headless.js'
// 		// Get your app id from https://otpless.com/dashboard/customer/dev-settings
// 		script.setAttribute('data-appid', 'L9Q0IEHTP74YTQXRYS4N')
// 		// TODO: Add your app id					^here
// 		document.head.appendChild(script)
// 	}

// 	// Initializing the OTPless SDK when the script loads with the callback function
// 	script.onload = () => {
// 		OTPlessSignin = new window.OTPless(callback)
// 	}
// }



// 	const InitateAuth = (provider: string) => {
// 		OTPlessSignin.initiate({ channel: "OAUTH", channelType: provider });
// 	  };
// 	return (
// 		<div className={styles.page}>
// 			<main
// 				className={styles.main + ' ' + styles.homePage}
// 				id='home-page'>
	
		
// 				<button onClick={() => InitateAuth('WHATSAPP')}>Authenticate with WhatsApp</button>
// 			</main>
// 		</div>
// 	)
// }