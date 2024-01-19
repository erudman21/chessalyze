## Not deployed yet - but here's a small demo:

https://github.com/erudman21/chessalyze/assets/26533234/fd7e5f41-afd5-4410-be3a-ca5feeb423a6

### Built using NextJS 14 (learning app router through building this), Redis, NextAuth, and maybe Postgres

### <ins>Why?</ins>
Chess puzzles are a great way to improve your tactical abilities in chess, but your positional understanding is a much more abstract and difficult to train ability. Because of this, I'm trying to utilize ChatGPT and Stockfish to help players better understand the possible strengths and weaknesses of a position.

### <ins>What?</ins>
My idea is to present players with a specific position in a chess game and have them evaluate the position and give their justification for the evaluation they gave. Using Stockfish's evaluation of the position, ChatGPT will then rate/discuss the user's evaluation and assess how correct/incorrect the user's evaluation was.

Users can either enter their own Chess.com usernames so that the positions they are given are actually from games they have previously played, or get a position from a randomly selected high-rated tournament game.

My goal is to be able to help player's gain positional insights quickly just by looking at a position because that is a *very* integral part of getting better at chess.
