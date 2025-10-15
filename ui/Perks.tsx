'use client';

import Image from 'next/image';
import Link from 'next/link';

const perks = [
  {
    icon: '/assets/icons/expressDeliveryIcon.png',
    title: 'Fast Delivery',
    description:
      'Have your items delivered conveniently to your preferred location.',
    link: '/delivery',
    iconSize: 'w-20',
  },
  {
    icon: '/assets/icons/returnIcon.png',
    title: 'Hassle-Free Returns',
    description:
      "Easily return items that don't work as stated.",
    link: '/returns',
    iconSize: 'w-10',
  },
  {
    icon: '/assets/icons/customerSupportIcon.png',
    title: '24/7 Customer Support',
    description:
      'Get help and find answers to questions instantly.',
    link: '/contact-us',
    iconSize: 'w-10',
  },
];

const Perks = () => {
  return (
    <div
      className="flex gap-5 items-center justify-between p-7 mt-0 
        hover:shadow-(--card-box-shadow) hover:transform-(--card-hover-transform) transition-transform duration-400 ease-in-out
         bg-white/50 backdrop-blur-sm border border-black/10 "
    >
      {perks.map((perk, index) => (
        <Link
          href={perk.link}
          key={index}
          className="flex flex-col items-center justify-center gap-2 text-center break-words text-xs md:text-sm"
        >
          <Image
            width={50}
            height={50}
            src={perk.icon}
            alt={perk.title}
            className={perk.iconSize}
          />
          <h1 className="font-bold text-black hover:text-(--color-black)/70 duration-200">
            {perk.title}
          </h1>
          <p className="text-center text-black hover:text-(--color-black)/75 duration-200">
            {perk.description}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Perks;
