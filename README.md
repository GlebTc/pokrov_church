# Holy Protection of the Mother of God Church

<a href="https://pokrov-church-hamilton.netlify.app" target="_blank">Pokrov Church Hamilton</a>

## Fixes to Implement

- The Our Parish Desktop Menu will activate on hover on the subMenu, should only hover when onEnter on the Menu Item.
- For add-new-schedule-post I have to create the base page that retrieves user infromation from the server and prop drill it through.

## Architecture

DB:

1. news_posts
   - id -> uuid
   - created_at -> timestampz
   - title -> text
   - author -> text
   - content - text
   - blog_image_url (currently iamgeUrl) - text

2. schedule_posts
    - id -> uuid
    - created_at -> timestampz
    - title -> text
    - author -> text
    - schedule_image_url

3. page_content
    - id -> uuid
    - 

