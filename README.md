### `Sirvy`

you will need to update the url for facebook login when deploying most likely
also, check your local variables when you deploy AND check your package.json, for the command where you specify a port
also also, check how to you need to reconfigure your webhook

to style
    GraphDisplay
    Navbar
    Profile
    SignIn
    SignUp
    Sirvys
    SplashPage
    Fonts and Colors again

to do
    style and graphics, of course
    finish readme
    have mike help you set your database permissions
        stretch
            pair numbers and users in data viz
            edit numbers
            edit sirvys
            figure out how to deal wth extra/early/late texts
            organize groups
            drag and drop
            pdf graphic and email send

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
