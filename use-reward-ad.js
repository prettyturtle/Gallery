import { AdMobRewarded } from 'expo-ads-admob';
import { useEffect, useState } from 'react';


// const UNIT_ID = Platform.select({
//   ios: "ca-app-pub-9209699720203850/3514862734",
//   android: "..."
// })

// const UNIT_ID = "ca-app-pub-9209699720203850/3514862734" // 실제 ID
const UNIT_ID = __DEV__ ? "ca-app-pub-3940256099942544/1712485313" : "ca-app-pub-9209699720203850/3514862734"

export const useRewardAd = () => {

	const [isLoaded, setIsLoaded] = useState(false) // 광고가 로딩이 됐는지
	const [isRewarded, setIsRewarded] = useState(false) // 보상을 받을 수 있는 상태까지 광고를 봤는지
	const [isClosed, setIsClosed] = useState(false) // 광고가 닫혔는지


	const loadRewardAd = async () => {
		await AdMobRewarded.setAdUnitID(UNIT_ID)
		await AdMobRewarded.requestAdAsync()
		await AdMobRewarded.showAdAsync()
	}

	const resetValue = () => {
		setIsLoaded(false)
		setIsRewarded(false)
		setIsClosed(false)
	}

	useEffect(() => {
		AdMobRewarded.addEventListener("rewardedVideoDidLoad", () => {
			console.log("rewardedVideoDidLoad")
			setIsLoaded(true)
		})
		AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
			console.log("rewardedVideoUserDidEarnReward")
			setIsRewarded(true)
		})
		AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
			console.log("rewardedVideoDidDismiss")
			setIsClosed(true)
		})

		return () => {
			AdMobRewarded.removeAllListeners()
		}
	}, [])

	return {
		loadRewardAd,
		isLoaded,
		isRewarded,
		isClosed,
		resetValue
	}
}