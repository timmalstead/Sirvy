### `Sirvy`

you will need to update the url for facebook login when deploying most likely

to do
    change password email, delete user
    add sirvy function
    save sirvy function
    add number to send function
    full crud for both sirvys and numbers
    figure out how to do groups to send to
    data visualization
    pdf graphic and email send
    style, of course

user stories

a user can log in, using third party verification or their own email

a user can update their profile

a user can store numbers

a user can send surveys and recieve info back on them

a user can save the data of those surveys, visualize it and make pdfs of it

Sirvy is the best

i'm thinking some simple crud stuff stored locally, auth handled by firebase. maybe storage on firebase? though i don't know what i'd need to store.

don't know whether i'm gonna do the texting on the front or back end. probably wouldn't be too bad on the back end. pass req.body back for the number and message fields. we'll see.

then get the sent back data and some data visualization.
