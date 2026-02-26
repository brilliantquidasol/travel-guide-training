/**
 * Concierge starters (8+), demo conversations (6 with messages), and escalation examples.
 * type: 'starter' | 'conversation' | 'escalation'. Conversations have messages[] (role, content).
 */
export interface ConciergeMessageSeed {
  role: 'user' | 'assistant';
  content: string;
}

export interface ConciergeStarterSeed {
  label: string;
  prompt: string;
  type: 'starter' | 'conversation' | 'escalation';
  messages: ConciergeMessageSeed[];
  order: number;
}

export const conciergeStarterSeeds: ConciergeStarterSeed[] = [
  { label: 'Plan a romantic getaway', prompt: 'I\'m looking for a romantic getaway for two.', type: 'starter', messages: [], order: 0 },
  { label: 'Best time for safari?', prompt: 'When is the best time to see the Great Migration?', type: 'starter', messages: [], order: 1 },
  { label: 'Luxury on a budget', prompt: 'How can I experience luxury travel on a moderate budget?', type: 'starter', messages: [], order: 2 },
  { label: 'Santorini vs Amalfi', prompt: 'We can’t decide between Santorini and the Amalfi Coast for our honeymoon.', type: 'starter', messages: [], order: 3 },
  { label: 'Family safari', prompt: 'Is a safari suitable for children? We have a 10 and 14 year old.', type: 'starter', messages: [], order: 4 },
  { label: 'Maldives overwater villa', prompt: 'We want an overwater villa in the Maldives with a private pool.', type: 'starter', messages: [], order: 5 },
  { label: 'Kyoto in autumn', prompt: 'When is the best time for autumn leaves in Kyoto?', type: 'starter', messages: [], order: 6 },
  { label: 'Paris and Tuscany combo', prompt: 'Can we combine Paris and Tuscany in one trip?', type: 'starter', messages: [], order: 7 },
  {
    label: 'Demo: Santorini enquiry',
    prompt: 'Santorini 5 nights, cave hotel, sailing',
    type: 'conversation',
    messages: [
      { role: 'user', content: 'We’d like 5 nights in Santorini in September, with a cave hotel and a sunset sail.' },
      { role: 'assistant', content: 'Santorini in September is ideal—warm days and fewer crowds. I’d suggest our Caldera View Suites in Oia for cave accommodation with private plunge pools. We can add a sunset sailing experience with champagne on the caldera. Would you prefer to include a volcanic wine tasting and a day in Oia and Fira with a guide?' },
      { role: 'user', content: 'Yes, add the wine tasting and a half-day in Oia.' },
      { role: 'assistant', content: 'Perfect. I’ve put together a 5-night package: Caldera View Suites (Caldera Suite), sunset sail, volcanic wine tasting, and a half-day guided tour of Oia. I’ll send the detailed quote and itinerary to your email. Would you like to secure it with a deposit, or adjust any dates?' },
    ],
    order: 10,
  },
  {
    label: 'Demo: Safari timing',
    prompt: 'Great Migration dates',
    type: 'conversation',
    messages: [
      { role: 'user', content: 'When is the best time to see the Great Migration?' },
      { role: 'assistant', content: 'The Great Migration moves through the year. In Tanzania’s Serengeti: June–October you’ll often see large herds in the north and west; January–February is calving season in the south. For the classic river-crossing drama, July–September in the north is peak. I’d recommend at least 5–6 nights and a balloon safari for one morning. Should I suggest a sample itinerary and lodge?' },
      { role: 'user', content: 'Yes, 6 nights with a good lodge and balloon.' },
      { role: 'assistant', content: 'I suggest our Serengeti Great Migration Safari: 6 days with Four Seasons Safari Lodge Serengeti (or similar). It includes game drives, one hot-air balloon safari with bush breakfast, and a farewell bush dinner. I’ll send the full itinerary and price. Any dietary or room preferences?' },
    ],
    order: 11,
  },
  {
    label: 'Demo: Maldives villa',
    prompt: 'Overwater villa with pool',
    type: 'conversation',
    messages: [
      { role: 'user', content: 'We want an overwater villa in the Maldives with a private pool. 5 nights.' },
      { role: 'assistant', content: 'One&Only Reethi Rah has stunning overwater villas with private pools and direct lagoon access. We can also offer One&Only or similar with 5 nights, breakfast and dinner, and add-ons like a private sandbank dinner or sunset dhoni cruise. When are you thinking of travelling? November–April is dry season and best for visibility.' },
      { role: 'user', content: 'March. And we’d like the sandbank dinner once.' },
      { role: 'assistant', content: 'March is perfect. I’ve put together 5 nights in an Overwater Villa at One&Only Reethi Rah with half board and one private sandbank dinner at sunset. Seaplane transfer is arranged with the resort. I’ll send the quote. Would you like to add a spa treatment or diving?' },
    ],
    order: 12,
  },
  {
    label: 'Demo: Kyoto autumn',
    prompt: 'Autumn leaves Kyoto',
    type: 'conversation',
    messages: [
      { role: 'user', content: 'When is the best time for autumn leaves in Kyoto?' },
      { role: 'assistant', content: 'Peak autumn colour in Kyoto is usually mid- to late November. Tofuku-ji, Eikando, and Arashiyama are especially beautiful then. We have a 3-day Kyoto Autumn Leaves tour with a luxury hotel and private guide, or a longer Heritage & Ryokan trip that includes a night in a ryokan. Would you prefer to focus only on autumn temples or combine with culture and dining?' },
      { role: 'user', content: 'Focus on autumn temples, 3 days is enough.' },
      { role: 'assistant', content: 'I recommend our Kyoto Autumn Leaves tour: 3 days, 2 nights at Ritz-Carlton Kyoto (or similar), with private guide for Tofuku-ji, Eikando, Arashiyama, and Kiyomizu-dera. I’ll send the itinerary and price. Book early for November—it’s very popular.' },
    ],
    order: 13,
  },
  {
    label: 'Demo: Honeymoon Santorini vs Amalfi',
    prompt: 'Compare Santorini and Amalfi',
    type: 'conversation',
    messages: [
      { role: 'user', content: 'We can’t decide between Santorini and the Amalfi Coast for our honeymoon.' },
      { role: 'assistant', content: 'Both are superb. Santorini offers dramatic caldera views, cave hotels, and a more compact island feel—ideal if you love sunsets, wine, and 4–5 days of pure relaxation. The Amalfi Coast has cliffside villages (Positano, Ravello), boat days, and Italian gastronomy—better if you want variety: beaches, gardens, and day trips. You could also combine them: e.g. 4 nights Santorini, 4 nights Positano. Would you prefer one base or a combination?' },
      { role: 'user', content: 'Combination sounds great. 4 and 4.' },
      { role: 'assistant', content: 'I’ll put together an 8-night honeymoon: 4 nights at Caldera View Suites in Santorini (with sunset sail and wine tasting) and 4 nights at Le Sirenuse in Positano (with a private boat day and Ravello). Flights between Santorini and Naples can be arranged. I’ll send the full proposal. Any special requests for the trip (e.g. in-room surprise, dietary)?' },
    ],
    order: 14,
  },
  {
    label: 'Demo: Paris and Tuscany',
    prompt: 'Paris + Tuscany combined',
    type: 'conversation',
    messages: [
      { role: 'user', content: 'Can we combine Paris and Tuscany in one trip?' },
      { role: 'assistant', content: 'Absolutely. A classic split is 4 nights Paris and 4 nights Tuscany (e.g. Chianti). In Paris we’d include Louvre, Versailles, and fine dining; in Tuscany, a villa or castle stay with wine tastings, Siena, and a cooking class. Flight Paris–Florence is about 2 hours. We have a ready-made Paris & Tuscany Grand Tour template; I can tailor dates and hotels. When are you thinking of travelling?' },
      { role: 'user', content: 'Late May. And we want a castle in Tuscany.' },
      { role: 'assistant', content: 'Late May is ideal. I suggest Hotel de Crillon (or similar) in Paris and Castello di Casole in the Chianti hills—a restored castle with pool and vineyard views. I’ll send an 8-day itinerary with Louvre, Versailles, transfer to Florence, then 4 nights at the castle with wine and a cooking class. Shall I reserve provisional dates?' },
    ],
    order: 15,
  },
  {
    label: 'Escalation: Complex booking',
    prompt: 'Transfer to human for complex request',
    type: 'escalation',
    messages: [
      { role: 'user', content: 'We need a multi-country trip: Dubai, Maldives, then Bali, with specific dates and a birthday surprise in the Maldives.' },
      { role: 'assistant', content: 'That’s an exciting combination. To get the birthday surprise and all the logistics right across three countries, I’m going to connect you with our trip designer Sarah, who specialises in multi-destination trips and special occasions. She’ll call or email you within one working day with a draft itinerary and ideas for the Maldives surprise. Is there a preferred time for her to reach out?' },
    ],
    order: 20,
  },
  {
    label: 'Escalation: Group booking',
    prompt: 'Transfer to human for group',
    type: 'escalation',
    messages: [
      { role: 'user', content: 'We’re 12 people wanting a private villa in Greece for a week, with a chef and a yacht day.' },
      { role: 'assistant', content: 'For a group of 12 with a private villa, chef, and yacht, our group travel specialist will tailor everything to your dates and preferences. I’ve passed your request to James, who will contact you within 24 hours with villa options (Santorini, Mykonos, or mainland) and a sample programme. Do you have a preferred island or date range?' },
    ],
    order: 21,
  },
];
