import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const OurPolicy = () => {
    const items = [
        {
            icon: assets.exchange_icon,
            title: "Easy Exchange Policy",
            desc: "We offer hassle-free exchange policy",
        },
        {
            icon: assets.quality_icon,
            title: "7 Days Return Policy",
            desc: "We provide 7 days free return policy",
        },
        {
            icon: assets.support_img,
            title: "Best Customer Support",
            desc: "We provide 24/7 customer support",
        },
    ];

    return (
        <section className=" py-16 px-4">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-12 text-center text-gray-700">
                {items.map((item, i) => (
                    <div key={i} className="flex-1">
                        <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <img src={item.icon} alt={item.title} className="w-7 h-7" />
                        </div>
                        <h4 className="font-semibold text-base md:text-lg">{item.title}</h4>
                        <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurPolicy;
