import React from 'react'
import {Link} from 'react-router-dom'
function About() {
  
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-5xl text-slate-700 mb-4'><span className='text-slate-500'>About</span> Tran Van Huy</h1>
      <p className='mb-4 text-slate-700'>hello everyone my name is Huy, now I will talk about my major. 
      I am pursuing IT at Can Tho University.</p>
      <p className='mb-4 text-slate-700'>
The biggest reason I chose IT was because I had a strong passion for computers from a young age, in large part because it helped me make a lot of money
largely because it helps me make a lot of money, which everyone needs, and it also provides me with an ideal working environment where I can work remotely without having to go to the workplace.
      </p>
      <p className='mb-4 text-slate-700'>
        The biggest reason I chose IT was because I had a strong passion for computers from a young age, in large part because it helped me make a lot of money
largely because it helps me make a lot of money, which everyone needs, and it also provides me with an ideal working environment where I can work remotely without having to go to the workplace.
and it is similar to my dream of becoming a freelancer who can work wherever I want while still having financial and time autonomy.
Generally talking about the IT industry, most people think it's very cool, makes a lot of money, and anyone who studies that field becomes a millionaire when they graduate.
      </p>
      <p className='text-slate-700 mb-4'>But is that the truth?
Some of it is quite true to reality, but what people see is just the tip of the iceberg. The truth is that the IT industry is quite difficult and there is a lot of knowledge you have to learn. Actually, no major in college is easy, but if you compare the IT major with other majors, it actually has a little higher requirements. . It requires you to be persistent, hard-working, focused, effortful, and especially willing to learn new things. Because this is an industry associated with technology, and as you know, technology is always changing every day. If you don't learn new knowledge, you will definitely become obsolete and sooner or later you will be unemployed.
The IT industry includes many fields such as artificial intelligence, web, iot, but I chose to pursue fullstack web development because I found it quite suitable for me. You are wondering what fullstack development is, right? After graduating, I will develop websites such as facebook, youtube, tiktoc... which you use every day.</p>
      <Link to='mailto:huydo282003@gmail.com?subject=Regarding to&body='><button className='p-3 bg-slate-700 rounded-lg text-white uppercase'>Contact me</button></Link>
    </div>
  )
}

export default About
