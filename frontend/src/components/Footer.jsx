import React from 'react';
import { ReactComponent as Discord } from "../assets/discord.svg";
import { ReactComponent as Instagram } from "../assets/instagram.svg";
import { ReactComponent as VK } from "../assets/vk.svg";
import { ReactComponent as DonationAlerts } from "../assets/donationalerts.svg";
import { ReactComponent as Telegram } from "../assets/telegram.svg";
import { ReactComponent as Twitch } from "../assets/twitch.svg";
import { ReactComponent as YouTube } from "../assets/youtube.svg";

const Footer = () => {
	const socialNetworks = [
		{ name: 'discord', icon: Discord, url: 'https://discord.gg/M9FrCQQE' },
		{ name: 'instagram', icon: Instagram, url: 'https://www.instagram.com/iamkatekg/' },
		{ name: 'vk', icon: VK, url: 'https://vk.com/yoursoul23' },
		{ name: 'donation-alerts', icon: DonationAlerts, url: 'https://www.donationalerts.com/r/iamkatekg' },
		{ name: 'telegram', icon: Telegram, url: 'https://t.me/yousoul18' },
		{ name: 'twitch', icon: Twitch, url: 'https://www.twitch.tv/iamkatekg1' },
		{ name: 'youtube', icon: YouTube, url: 'https://www.youtube.com/@iamkatekg' },
	];

	const handleSocialClick = (url) => {
		window.open(url, '_blank');
	};

	return (
		<div className="social_wrapper">
			{socialNetworks.map((network) => (
				<network.icon
					key={network.name}
					className="social"
					onClick={() => handleSocialClick(network.url)}
				/>
			))}
		</div>
	);
};

export default Footer;
