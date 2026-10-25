// Long-form pages. Original writing for this project (CC0). L(path) builds site links.

export const GUIDE = (L) => `
<p class="lead">A homemade board game can be ready in an afternoon, and a good one gets played for years. Here is the process that works for classroom review games, birthday quizzes and family game nights alike, with free templates for every step.</p>

<h2>1. Start from a mechanic people already know</h2>
<p>The fastest way to a fun game is a proven core: something players understand in thirty seconds, so the fun comes from your content. Traditional mechanics are free for anyone to use:</p>
<ul>
  <li><b>Bingo:</b> everyone plays at once, which makes it ideal for big groups. Try <a href="${L("games/bingo/")}">Clue Bingo</a>.</li>
  <li><b>Matching pairs:</b> memory and go-fish style games for two to six players. See <a href="${L("games/match/")}">Match Up</a>.</li>
  <li><b>Roll and move:</b> a race along a track with question spaces, shortcuts and setbacks. See <a href="${L("games/summit/")}">Summit Scramble</a>.</li>
  <li><b>Loop cards:</b> a chain where every answer leads to the next question, great for a whole class. See <a href="${L("games/loop/")}">I Have, Who Has?</a>.</li>
  <li><b>Word guessing and charades:</b> loud, social and good for mixed ages. See <a href="${L("games/taboo/")}">Talk Around It</a> and <a href="${L("games/ads/")}">Act, Draw or Say</a>.</li>
  <li><b>Four in a row:</b> a two-player duel. See <a href="${L("games/grid/")}">Claim the Grid</a>.</li>
</ul>
<p>Avoid copying a famous game's name, artwork or exact rules: those belong to their publishers. Mechanics like rolling a die and moving have been shared for centuries; your own theme, names and rules are what make the game yours.</p>

<h2>2. Write good clues and answers</h2>
<ul>
  <li><b>One clear answer per clue.</b> If two answers could fit, players will argue (sometimes that's half the fun, but not in a review game).</li>
  <li><b>Describe, don't define.</b> “The planet that spins on its side” sticks better than a dictionary line.</li>
  <li><b>Keep answers short.</b> One to three words fit a bingo square or a card.</li>
  <li><b>Mix easy and hard.</b> Early wins keep younger or newer players in the game.</li>
  <li><b>Aim for 20 to 30 pairs.</b> Enough for a full bingo card and a good-sized deck. Bingo needs at least 9, matching games at least 6.</li>
</ul>
<p>Short on time? Start from one of the <a href="${L("topics/")}">ready-made topics</a> and edit it.</p>

<h2>3. Playtest once before the big day</h2>
<p>Play a quick round with two or three people. Watch for clues nobody can answer, rules people ask about twice, and moments where everyone waits. Fix those, and the game is ready. Most fixes are one line: a clearer clue, a shorter board, a rule about what happens on a tie.</p>

<h2>4. Print and assemble</h2>
<ul>
  <li><b>Paper:</b> card stock (around 65–110 lb or 175–300 gsm) makes cards that shuffle well. Ordinary paper works for bingo sheets and answer keys.</li>
  <li><b>Printer settings:</b> print at 100% (“actual size”), not “fit to page”, so cards line up with the cut marks.</li>
  <li><b>Cutting:</b> a paper trimmer is fastest; follow the dotted lines and the small marks in the margins.</li>
  <li><b>Making it last:</b> laminate the board and bingo cards, or slide cards into penny sleeves, and use dry-erase markers.</li>
  <li><b>Pieces:</b> buttons, coins or dried beans make fine counters; every board game here includes paper pawns and a die to fold.</li>
</ul>

<h2>5. Make it a tradition</h2>
<p>Keep the deck in an envelope with the rules, and add new cards over time. Teachers often run one game per unit; families bring theirs out every holiday. When you want a new version, change the words in the <a href="${L("make/")}">editor</a> and print again.</p>
`;

export const ABOUT = (L, cfg) => `
<p class="lead">Printable Game Maker turns any list of clues and answers into printable games: bingo cards, matching cards, a board game, loop cards, word-guessing and charades cards, a four-in-a-row duel and quiz-night sheets. It is free, runs in your browser and needs no account.</p>

<h2>How the games were made</h2>
<p>The eight games were designed in advance by an AI system (Claude, made by Anthropic) working for this project: the names, rules, card layouts and boards are original. Each one is built on a traditional public-domain mechanic, such as bingo, matching pairs, roll-and-move racing or four in a row. Nothing runs on an AI service when you use the site: the editor lays out your pages with fixed templates in your browser, so the same list always gives the same game.</p>
<p>The ready-made topics were also written for this project and checked for accuracy. If you spot a mistake, please open an issue on <a href="https://github.com/${cfg.repo}/issues">GitHub</a>.</p>

<h2>Privacy</h2>
<ul>
  <li>Your lists stay in your browser (local storage). Clearing your browser data deletes them.</li>
  <li>PDFs are made on your device. Nothing you type is uploaded.</li>
  <li>Share links carry the whole game inside the link, after the <code>#</code>, which browsers never send to the server.</li>
  ${cfg.goatcounter ? "<li>The site counts visits and a few anonymous events, such as “a PDF was downloaded”, with GoatCounter, which uses no cookies and collects no personal data. It is skipped if your browser sends Do Not Track or Global Privacy Control.</li>" : "<li>The site does not use analytics or cookies.</li>"}
</ul>

<h2>Using what you print</h2>
<p>Print as many copies as you like, for your class, your school, your party or your family. Teachers are welcome to share the PDFs with colleagues. The games, layouts and topic lists are dedicated to the public domain (CC0), so you can also adapt them for your own materials.</p>

<h2>Not affiliated</h2>
<p>This site is not affiliated with any game publisher. Game names here are our own; mechanics such as bingo are traditional and free to use.</p>

<h2>Credits</h2>
<ul>
  <li>Code, game designs, layouts and topic lists: CC0 1.0 (public domain). Source: <a href="https://github.com/${cfg.repo}">github.com/${cfg.repo}</a>.</li>
  <li>Fonts: <a href="https://www.brailleinstitute.org/freefont/">Atkinson Hyperlegible</a> by the Braille Institute, designed for legibility, and <a href="https://github.com/google/fonts/tree/main/ofl/lilitaone">Lilita One</a> by Juan Montoreano, both under the SIL Open Font License 1.1 (<a href="${L("assets/fonts/OFL-AtkinsonHyperlegible.txt")}">license</a>, <a href="${L("assets/fonts/OFL-LilitaOne.txt")}">license</a>). They are embedded unmodified in the PDFs.</li>
</ul>
`;
