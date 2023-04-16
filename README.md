# Goals
- demonstrate SSR with `getServerSideProps` in a simple to understand way
    - SSR is great for data fetching at the page/view level and avoids making unnecessary http requests
- demonstrate `useSWR` and `useSWRMutation` for client side data fetching
    - swr is great because it caches api requests/responses and revalidates to avoid making extra requests. This means we can safely try to fetch the data multiple times in a page, but it will only actually be fetched once
        - this lets us avoid needing context in many situations we might have otherwise needed it
    - client side data fetching is great for data fetching at the component level
    - client side data fetching is necessary if we want to fetch/mutate data upon user input/interaction such as submitting a form or clicking a button
- demonstrate benefits of service architecture
    - by abstracting out our db interaction logic, our controllers don't need to change even if our db/orm does
    - the same service functions used to handle our db interactions in our api endpoints can also be used to fetch data with ssr
    - by abstracting out our client side request logic, our react views/components don't need to change, even if we change the api we are using
# Tech used
- next.js for framework
- sqlite for db
- sequelize for orm
- iron-session for session
# TODO
- refactor server services/api endpoints, definitely could be cleaner

