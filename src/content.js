// ============================================================
// 🌟 CENTRAL CONTENT CONFIGURATION
// ============================================================
// This is the ONLY file you need to edit to personalise the website.
// Change any text, photo, or message below.
// The website will never break if you leave an optional field empty.
// ============================================================

const content = {
  // -----------------------------------------------------------
  // 👤 PEOPLE
  // -----------------------------------------------------------
  herName: 'Khushi',
  herNickname: 'Khushi',          // Used in casual spots
  myName: 'Ujjwal',

  // -----------------------------------------------------------
  // 🎂 BIRTHDAY
  // -----------------------------------------------------------
  // Format: YYYY-MM-DD  (used to calculate countdown)
  birthdayDate: '2026-10-20',
  birthdayYear: 2026,

  // -----------------------------------------------------------
  // ✨ OPENING SCREEN
  // -----------------------------------------------------------
  openingTagline: 'A little universe, made just for you, Khushi ❤️',
  openingSubtext: 'Tap the heart to begin.',
  openingButton: 'Tap the heart to begin ✨',

  // -----------------------------------------------------------
  // 🎂 BIRTHDAY SECTION
  // -----------------------------------------------------------
  birthdayHeading: 'Happy Birthday, Khushi ❤️',
  birthdaySubheading: '20 October 2026 — your day, your little universe.',
  birthdayMessage: `Another year of being the kind of person who 
makes the world a little warmer just by being in it.

I hope this year treats you the way you deserve — 
with kindness, with beautiful surprises, and with 
countless little moments that make you smile.

Happy Birthday. 🎂`,

  // -----------------------------------------------------------
  // 🌳 INTERACTIVE TREE OF HEARTS
  // -----------------------------------------------------------
  // 12 clickable pink and red hearts + 1 special golden heart.
  // Each heart has an editable title, color, and heartfelt message.
  treeHeading: 'The Tree of Hearts 🌳❤️',
  treeSubheading: 'Every heart on this tree carries a little thought, feeling, or memory for you. Tap the hearts to explore.',
  treeHearts: [
    {
      id: 1,
      title: 'Dear Betu  🌸',
      color: '#e85d75',
      message: `Happiest birthday, betuuu! ❤️ I hope aaj tere face pe sabse pyaari smile ho, because honestly, teri smile se zyada pyaara kuch nahi lagta mujhe.`,
    },
    {
      id: 2,
      title: 'Your Smile Betu ✨',
      color: '#f06292',
      message: `Bhyii, the way you smile! 😭❤️ Pata nahi tujhe realise hota hai ya nahi, but jab bhi tu smile karti hai na, main literally sab bhul jaata hoon`,
    },
    {
      id: 3,
      title: 'My Favourite Person🌷',
      color: '#d81b60',
      message: `Out of all the people I've met, tu mere liye genuinely bohot special hai. Teri place meri life mein alag hai, betu, and no one can replace the memories we've made..`,
    },
    {
      id: 4,
      title: 'Memories 🌙',
      color: '#c2185b',
      message: `That ice cream moment in front of Mahagun will always be special to me. It might look like such a small memory, but for me, it's one of those moments I wish I could relive once again. ❤️`,
    },
    {
      id: 5,
      title: 'The Best Hugs 🌿',
      color: '#e91e63',
      message: `Those hugs where we didn't even need to say anything. Bas ek dusre ko hug karke rehna. Idk how to explain it, but those little moments will always mean a lot to me, betu.`,
    },
    {
      id: 6,
      title: 'My Little Wish 💗',
      color: '#ff4081',
      message: `My little wish for you is that life gives you a thousand reasons to smile, that you achieve everything you dream of, and that you never forget how special you are. ❤️`,
    },
    {
      id: 7,
      title: 'That Eye Contact 👀',
      color: '#d32f2f',
      message: `Jab bhi humara eye contact hota hai and tu smile karti hai na, bhyii, I'm gone. 😭❤️ Us moment mein kuch yaad nahi rehta, bas tu dikhti hai and tere liye aur pyaar aa jaata hai.`,
    },
    {
      id: 8,
      title: 'Mera Sotdu Baccha 🕊️',
      color: '#f48fb1',
      message: `You're not just Khushi to me, you're my betu. ❤️ And no matter how much I try to explain it, I don't think words will ever be enough to tell you how much love I have for you.`,
    },
    {
      id: 9,
      title: 'For Your Happiness 🌷',
      color: '#e53935',
      message: `I genuinely love seeing you happy, Khushi. I hope you always get the love, care, respect and happiness you deserve. And I hope you never stop smiling the way you do. ❤️`,
    },
    {
      id: 10,
      title: 'Things I Cant Explain 💌',
      color: '#ff5252',
      message: `Sometimes I have so much to say to you, but when it comes to explaining my feelings, words feel so small. Maybe one day you'll understand everything I struggle to put into words. ❤️`,
    },
    {
      id: 11,
      title: 'Always Special ⭐',
      color: '#f06292',
      message: `No matter how life changes or where we end up, I'll always be grateful that I got to know you the way I did. You gave me memories that I'll always carry with a smile. ❤️`,
    },
    {
      id: 12,
      title: 'One Last Thing Before the Golden One 🫶',
      color: '#c62828',
      message: `Khushi, if there's one thing I wish you could see, it's how genuinely special you are to me. I might not always find the right words, but the feelings behind them are always real. Happy birthday, my betu. ❤️`,
    },
  ],

  // The 13th special Golden Heart (centered on the tree with an emotional longer message)
  goldenHeart: {
    id: 'golden',
    title: 'The Golden Heart — If My Heart Could Speak 💛✨',
    badge: 'Special Golden Heart 💛',
    color: '#d4a853',
    message: `Khushi, ❤️

If you've opened all 12 hearts, here's the last one, the one I wanted to keep a little different.
Idk if I'll ever be able to explain how much you mean to me. From our Mahagun ice cream memories to our hugs, our eye contact, and that smile of yours, I'll always cherish every little moment with you.
Somewhere in my heart, I still hope that one day you'll choose me too, not because I waited, but because you genuinely want to. And if we ever get that chance, I'll give my best to make you feel loved and valued.
For now, just keep smiling and enjoy your birthday, my betu. ❤️
"I don't have all the words to explain my love for you. But if there's one person my heart keeps choosing, it's you, Khushi." 💛`,
    signoff: '— Ujjwal',
  },

  // -----------------------------------------------------------
  // 📸 PHOTO SCRAPBOOK
  // -----------------------------------------------------------
  // HOW TO ADD YOUR PHOTOS:
  // 1. Place your photo files in the  public/photos/  folder
  // 2. Update the 'src' field below with the filename
  //    Example: src: '/photos/our-first-trip.jpg'
  // 3. Add a caption and optional date
  // 4. To remove a photo, delete its entry from this array
  scrapbookHeading: 'A few little moments worth keeping close 📸',
  photos: [
    {
      id: 1,
      src: '/photos/ph1.jpg',   // Replace with your photo
      caption: 'My Betu, always.',
      date: '',                             // Optional, e.g. 'March 2025'
    },
    {
      id: 2,
      src: '/photos/ph2.jpg',
      caption: 'Beautiful, effortlessly 🌷',
      date: '',
    },
    {
      id: 3,
      src: '/photos/ph3.jpg',
      caption: 'My favourite smile 💗',
      date: '',
    },
    {
      id: 4,
      src: '/photos/ph4.jpg',
      caption: 'My favourite person',
      date: '',
    },
    {
      id: 5,
      src: '/photos/ph5.jpg',
      caption: "My favourite kind of chaos ❤️",
      date: '',
    },
    {
      id: 6,
      src: '/photos/ph6.jpg',
      caption: 'My favourite kind of eye contact',
      date: '',
    },
  ],

  // -----------------------------------------------------------
  // 💌 PERSONAL LETTER
  // -----------------------------------------------------------
  // Paste your complete letter below between the backticks.
  // Preserve your line breaks, emojis, Hinglish — everything.
  // The website will display it exactly as you write it.
  letterHeading: 'A little letter for you 💌',
  letter: `# To my Khushi, my betu ❤️

Pata hai betu, there are so many things I want to tell you, but whenever I try to put my feelings into words, it always feels like I'm leaving something unsaid.

I still remember our first meeting outside, when we spent time together and ate ice cream in front of Mahagun. And from that day to all the little moments we've shared, pata hi nahi chala kab tu meri life ka itna special part ban gayi.

I remember how we'd go to the park, just walk around, talk about random things, spend time together, and jhula bhi jhulte the. Maybe these things seemed normal at the time, but betu, I genuinely adored being with you. I didn't need us to do anything special. Bas tu mere saath hoti thi, and I was happy.

And those moments in college when we'd hold hands while walking together… bhyii, I can't even explain what I used to feel. It was such a simple thing, but I felt so happy just walking beside you. Kabhi kabhi toh bas tujhe dekh kar hi lagta tha ki yaar, I really have someone this special in my life.

And betu, I'll never forget that day before our college fest when we went to Laxmi Nagar because you needed clothes. I was so excited, thinking about how pretty you'd look at the fest. Tu baar-baar different dresses try karke mujhse pooch rahi thi ki kaisi lag rahi hai, and honestly, tujhe kaise batata ki meri betu har dress mein kitni pyari lag rahi thi? 😭❤️ I just kept thinking how beautiful you looked. I don't know if you noticed how excited I was, but that day was genuinely so special to me. It wasn't just about shopping; it was about spending that time with you.

I remember Sarojini too, when I was angry and you held my arm. Pata nahi kyun, but us moment mein main sab bhool gaya tha. Bas yahi feel ho raha tha ki Khushi mere saath hai. And somehow, that was enough to make me feel better.

You know, when my own friends betrayed me and so many things were going wrong in my life, I used to tell myself, *"Sab dekh lunga, Khushi mere saath hai, main sab handle kar lunga."* I don't know if you ever realised how much your presence meant to me during those times. You didn't have to fix everything or make all my problems disappear. Just having you in my life gave me a kind of strength that I can't properly explain.

And then there are those hugs where we didn't even say anything, those moments when our eyes met and you smiled, and I'd forget everything for a second. Khushi, I swear, sometimes I'd be thinking about a hundred things, but the moment I'd look at you, all I could think about was how much I loved you. You're really my betu, and these little moments have always meant more to me than you probably realise.

And 13th March will always be special to me. When we kissed for the first time, I fell even harder for you. Bas us moment mujhe laga ki yahi hai, it's you, Khushi. You're the person I love, the person I want, and the person my heart keeps choosing. I don't know how to explain what I felt that day, but I know that my feelings became even deeper.

Sometimes I wish you could see yourself through my eyes. You'd understand why your smile means so much to me, why I remember the smallest things about us, and why even the simplest moments with you can make me so happy. You might forget some of these little things, but I remember them because they happened with you.

I know things aren't easy between us right now, and I understand that there's a lot going on. I'm not writing all this to pressure you or make you feel like you owe me anything. I just want you to know what you've meant to me and how genuinely I've felt everything we've shared.

And yes, somewhere in my heart, I still hope that one day you'll choose me too. Not because I've waited for you, not because you feel bad for me, but because one day you'll genuinely want me by your side. I hope that someday things become simpler for us, and it'll just be you and me, choosing each other and making our own little world.

I want to be someone with whom you can be completely yourself. Someone you can talk to when things are difficult, someone who listens to you, and someone who makes you feel loved and valued. I know I won't always be perfect, but I'll always want to give my best.

And betu, more than anything, I want you to be happy. I want you to believe in yourself, achieve everything you dream of, and never feel like you're not enough. You deserve so many beautiful things in life, Khushi, and I genuinely wish that you get them all. And a little selfish part of my heart will always hope that someday I get to be a part of that happiness too.

I don't know how to explain the feelings I have while writing this. Maybe it's because there are so many memories, so much love, and so many things I've never been able to say properly when I'm actually in front of you. No matter how much I write, it still feels like words aren't enough.

But I'm glad these moments happened. I'm glad I got to know you, spend time with you, hold your hand, hug you, see you smile, and make memories that I'll always cherish. Whatever happens in the future, these moments will always mean something to me.

Happy birthday, my betu. ❤️ I hope this year gives you countless reasons to smile and makes you happier than ever.

And somewhere in my heart, I'll keep hoping that one day, when the time is right and you genuinely want it too, it'll be our time.

I love you, Khushi. More than these words could ever explain. ❤️

`,

  letterSignoff: 'Made with love, just for you. ❤️',
  letterFrom: '— Ujjwal',

  // -----------------------------------------------------------
  // 🌷 LITTLE THINGS ABOUT YOU — Interactive Cards
  // -----------------------------------------------------------
  cardsHeading: 'Little things that make you, you.',
  cards: [
    {
      title: 'Your smile ✨',
      message: `The kind that makes everything feel 
a little lighter, a little warmer, a little more okay.`,
    },
    {
      title: 'Those little moments 🌙',
      message: `The quiet ones. The silly ones. 
The ones nobody else would notice — 
but somehow they end up meaning the most.`,
    },
    {
      title: 'Your eyes and expressions 💗',
      message: `The way you look when you're truly happy. 
That expression when something catches you off guard. 
It's hard to forget.`,
    },
    {
      title: 'The little things that make you special 🌷',
      message: `The way you care a little too much. 
The way you notice what most people miss. 
The way you make ordinary things feel different.`,
    },
    {
      title: 'Reasons to celebrate you 🌸',
      message: `Not because of a date on the calendar. 
But because the world is just a little bit better 
with you in it.`,
    },
    {
      title: 'A little reminder for today 🫶',
      message: `You are enough. You are appreciated. 
And you deserve every beautiful thing 
that comes your way.`,
    },
  ],

  // -----------------------------------------------------------
  // 💌 OPEN WHEN... MESSAGES
  // -----------------------------------------------------------
  openWhenHeading: 'For the moments when you need a little something.',
  openWhenMessages: [
    {
      title: 'Open when you need a smile 😊',
      message: `Heyy meri betu ❤️

Smile kar na thoda sa, please? 🥹 Pata hai, teri smile kitni pyari hai? And how you smile when our eyes meet, bhyii, I literally forget what I was thinking.

Yaad hai jab hum Laxmi Nagar gaye the before the fest, and tu baar-baar different dresses try karke mujhse pooch rahi thi ki kaisi lag rahi hai? 😭 Betu, tu har dress mein pyari lag rahi thi, I just didn't know how to explain it to you.

Bas aise hi haste rehna, okay? Teri smile genuinely makes things better. And if you're smiling right now after reading this, then mission successful. ❤️🧸`,
    },
    {
      title: "Open when you're having a difficult day 🌧️",
      message: `Hey Khushi ❤️

I know some days are just difficult, and sometimes everything feels like too much. But betu, you don't have to figure everything out today. Take a breath, give yourself some time, and be a little kinder to yourself.

Remember, you've made it through difficult days before, and you don't have to be strong every single second. It's okay to feel low, too.

I wish I could give you a hug right now and remind you that one bad day doesn't define your life. Take things slowly, meri betu. One thing at a time. You deserve some gentleness, too. 🫂❤️`,
    },
    {
      title: 'Open when you need a little encouragement 🌷',
      message: `### 🌷 Open when you need a little encouragement

Heyy betu ❤️

Pata hai, sometimes you overthink so much that you forget how capable you actually are. So here's a little reminder from me: **you're doing better than you think, Khushi.**

You don't have to figure everything out at once. Take things one day at a time, and don't let your past or your mistakes decide how you see yourself today. You've grown so much, and there's still so much beautiful stuff waiting for you.

And please, don't doubt yourself so much, okay? I wish you could see even a little of what I see in you. Be proud of yourself, meri betu. You've got this. And on the days when you don't feel strong, it's okay to take a break and try again tomorrow.

**Believe in yourself a little more, Khushi. I'm rooting for you, always. ❤️🧸**`,
    },
    {
      title: 'Open when you need a reminder that you matter ✨',
      message: `### 💗 Open when you need a reminder that you matter

Heyy, meri betu ❤️

I don't know what you're going through when you open this, but I want you to remember one thing: **you matter, Khushi. More than you sometimes realise.**

Your feelings matter, your happiness matters, and even on days when you don't feel like yourself, you still matter just as much. You don't have to be perfect, make everyone happy, or pretend to be okay all the time.

Please don't let your past or anyone else's words make you forget your worth. You're allowed to have bad days, to feel lost, and to take your time figuring things out.

I wish you could see yourself the way I see you, betu. But even when you can't, I hope you remember that you deserve happiness, kindness, and love simply by being yourself.

**Never forget that, okay? You're important, you're enough, and you matter. Always. ❤️🫂**`,
    },
  ],

  // -----------------------------------------------------------
  // 🌼 BIRTHDAY WISHES GARDEN
  // -----------------------------------------------------------
  gardenHeading: 'Eight little wishes for your new chapter 🌼',
  wishes: [
    'May your days be filled with little reasons to smile and moments that make your heart feel light.🌟',
    'May you always believe in yourself, even on the days when you find it hard to. 🕊️',
    'May your mind find quiet when life feels overwhelming, and may you be kinder to yourself. 💜',
    'May this new chapter bring you moments youll look back on and smile about.',
    'May you achieve everything youre working for and feel proud of the person youre becoming.',
    'May you always find the courage to begin again, no matter how difficult yesterday was.',
    'May you always be surrounded by the kind of love that makes you feel valued, respected, and understood🌸',
    'I hope life gives you countless reasons to smile, Khushi. You deserve so many beautiful things. ❤️',
  ],

  // -----------------------------------------------------------
  // 🎁 FINAL SURPRISE
  // -----------------------------------------------------------
  finalSurpriseHeading: 'One last little thing before you go… 🎁',
  finalMessage: `I hope this new year of your life brings you countless reasons to smile, beautiful memories to cherish, and days that feel a little lighter. You deserve so many beautiful things, Khushi. ❤️
And remember, betu, I'm always here for you, no matter what. Bas ek call karna, and I'll be there for you whenever you need me. You don't have to face every difficult moment alone. 🫂❤️
And selfishly, I hope this year brings us a few more beautiful memories together, too. 🥹
Happy Birthday, my betu. ❤️
With all my heart,
Ujjwal 💗`,

  finalKeepsake: '',
  exploreAgainButton: 'Explore again ↺',

  // -----------------------------------------------------------
  // 🎵 MUSIC (optional)
  // -----------------------------------------------------------
  // To add background music:
  // 1. Place a licensed audio file in  public/music/
  // 2. Set musicSrc to the path, e.g. '/music/gentle-piano.mp3'
  // 3. Set musicEnabled to true
  musicEnabled: true,
  musicSrc: '/music/fitoor.mp3',
  musicStartTime: 25,
  musicEndTime: 205,
  songTitle: "Yeh Fitoor Mera",
artistName: "Arijit Singh",

  // -----------------------------------------------------------
  // 🎨 THEME COLOURS
  // -----------------------------------------------------------
  theme: {
    midnightPurple: '#1a1035',
    deepPlum: '#2d1b4e',
    burgundy: '#4a1525',
    dustyRose: '#c9a0a0',
    blushPink: '#e8c4c4',
    ivory: '#faf3e8',
    warmCream: '#faf3e8',
    mutedLavender: '#b8a9c9',
    subtleGold: '#d4a853',
    softWhite: '#f5f0ff',
    heartRed: '#e85d75',
  },

  // -----------------------------------------------------------
  // 👁️ SECTION VISIBILITY
  // -----------------------------------------------------------
  // Set any to false to hide that section
  sections: {
    welcome: true,
    birthday: true,
    treeOfHearts: true,
    scrapbook: true,
    letter: true,
    cards: true,
    openWhen: true,
    garden: true,
    finalSurprise: true,
  },
};

export default content;
