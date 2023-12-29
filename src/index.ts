const baseUrl = 'https://api.steampowered.com/'

const getGames = async (steamId: string) => {
  const url = new URL('IPlayerService/GetOwnedGames/v0001', baseUrl);
  url.searchParams.append('key', process.env.STEAM_API_KEY);
  url.searchParams.append('steamid', steamId);
  url.searchParams.append('include_appinfo', 'true');
  url.searchParams.append('format', 'json');

  const games = await fetch(url);

  return (await games.json()).response as { game_count: number, games: any[]};
}

const gamesRes = await getGames(process.env.STEAM_ID!);
const totalGames = gamesRes.game_count;
const games = gamesRes.games.sort((prev, next) => next.playtime_forever - prev.playtime_forever);

console.log('Total Games found:', totalGames);

console.log(games[0]);
