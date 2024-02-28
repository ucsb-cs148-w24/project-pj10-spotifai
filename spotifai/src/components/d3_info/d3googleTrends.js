// import * as trends from 'google-trends-api';

// function googleTrends() {
//   trends.interestOverTime({keyword: 'Women\'s march'})
//   .then(function(results){
//     console.log('These results are awesome', results);
//   })
//   .catch(function(err){
//     console.error('Oh no there was an error', err);
//   });
//   return trends;
// }

// export default googleTrends;

import * as gtrends from 'g-trends'

function googleTrends() {
  const explorer = new gtrends.ExploreTrendRequest()

  explorer.addKeyword('Dream about snakes')
    .compare('Dream about falling')
    .download().then( csv => {
        console.log('[✔] Done, take a look at your beautiful CSV formatted data!')
        console.log(csv)
    }).catch( error => {
        console.log('[!] Failed fetching csv data due to an error',error)
    })

}

export default googleTrends;
