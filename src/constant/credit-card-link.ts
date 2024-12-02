export const creditCardLink = ({
	orderId,
	campaignCode
}: {
	orderId: string
	campaignCode: string
}) => {
	let link: string = ''

	switch (campaignCode) {
		case 'vpbankcc':
			link = `https://cards.vpbank.com.vn/?utm_campaign=JarvisCustCC.Partner&utm_source=FiMi&utm_medium=${orderId}`
			break
		case 'hdbvjp':
			link = `https://hdbank.page.link/?link=https://hdbank.page.link/?channel%3Ddop%26productcode%3DDOPVJ%26utm_source%3DFIMI%26utm_campaign%3Dtest%26utm_channel%3DDOP%26utm_ref%3D${orderId}&apn=com.vnpay.hdbank&isi=1461658565&ibi=com.vnpay.HDBank`
			break
		case 'hdb4in1':
			link = `https://hdbank.page.link/?link=https://hdbank.page.link/?channel%3Ddop%26productcode%3DDOPPLX%26utm_source%3DFIMI%26utm_campaign%3Dtest%26utm_channel%3DDOP%26utm_ref%3D${orderId}&apn=com.vnpay.hdbank&isi=1461658565&ibi=com.vnpay.HDBank`
			break
		case 'tpbevo':
			link = `https://evocard.tpb.vn/?utm_source=avay_afffimi&utm_campaign=First&utm_medium=${orderId}`
			break
		case 'vibtra':
			link = `https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-travel-eilte&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-${orderId}`
			break
		case 'vibpre':
			link = `https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-premier-boundless&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-${orderId}`
			break
		case 'vibsup':
			link = `https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-supercard&utm_source=Public_Website&utm_medium=Affiliate_FIMIVIB-${orderId}-&utm_content=Affiliate_FIMIVIB-${orderId}`
			break
		case 'vibonl':
			link = `https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-onlineplus-2in1&utm_source=Public_Website&utm_medium=Affiliate_FIMIVIB-${orderId}-&utm_content=Affiliate_FIMIVIB-${orderId}`
			break
		case 'vibcas':
			link = `https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-cashback&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-${orderId}`
			break
		case 'vibfam':
			link = `https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-family-link&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-${orderId}`
			break
		case 'vibfin':
			link = `https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-financial-free&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-${orderId}`
			break
		case 'viblaz':
			link = `https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-lazcard&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-${orderId}`
			break
		case 'vibrew':
			link = `https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-rewards-unlimited&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-${orderId}`
			break
		case 'vibivy':
			link = `https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-ivycard&utm_source=Public_Website&utm_medium=Affiliate_FIMIVIB-${orderId}&utm_content=Affiliate_FIMIVIB-${orderId}`
			break
		case 'muadee':
			link = `https://muadee.page.link/?link=https://muadee.com.vn&utm_source=BTM_Fimi&utm_medium=${orderId}&utm_campaign=aff_pub&apn=com.muadee.hdbank&amv=3&ibi=com.muadee.hdbank&isi=1633030865&efr=1&ius=muadee://&_imcp=1`
			break
		case 'vpbankneo':
			link = `https://vpbankneo.page.link/FIMI1111`
			break
	}

	return link
}
