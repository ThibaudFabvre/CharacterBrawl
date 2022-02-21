
# Starting the app

 1- Download the project by doing ```git clone https://github.com/ThibaudFabvre/CharacterBrawl.git```
 2- Go inside the project by doing ``` cd character-brawl```
 3- Use the command ```yarn start``` to launch the project
 
 
 
 # Key notes
 -> Some of the project initial criterias have been modified
 -> The project is not linked to the backend due to a CSRF token issue on the back-end part (probably the way I request the list of opponents) and because of lack of time.
 
 # Analysis of the project
 The key pain points of the projects are its lack of clarity towards its usability (is it multiplayer or solo) and the lack of thought behind the combat system (is it turn based or not).
 Several requirements contradicted each other so there was a need to modify the criterias.
 
- The system is turn based (meaning there cannot be a draw in a battle)
- The game is a solo game
 
 # Vision
 Due to the requirements mostly centered around scalability here are the following points that have been or should have been addressed:
- Back-end and front-end coordination => Solved via a formater pattern for encoding and decoding API calls/responses. If the back-end makes changes without the front-end team knowing, the app will tell the front-end team via typescript and the formaters, which part has been modified, which allows the front-end team to easily get the updated information since it already knows which parts have been modified. No need for further research.
- Front-end standardization => via prettier (not done due to lack of time), commitlints (should be done on the pipelines directly not on the front-end project to enforce rules)
- Code quality => This app could have been done in TDD style. I didn't have time so I only did it for a few things, but I think it would have been a good practice
- Front-end and design coordination => via the use of the AirBnB atomic approach (not done due to lack of time). We could have also added Stylguidist or Storybook if we had an integrator to manage the components for the dev team, so the dev team could focus on the functionalities of the app.
- Dev team and marketing => Gerkhin would have been a bit too much for such a simple project as it requires a full implementation with pipelines, standardized ticketing etc... Even if the project was to be scaled, its functionalities are fairly limited, and it wouldn't be the marketing team that would necessarely do the requirements (in fact it would most likely be a Game Project Manager), so it would be overkill in that particular instance to add Gerkhin to the project since not only would the involved parties all understand the concepts discussed, but also the technical problematics behind those.
- Dev and Production team coordination => It would have been great to add Hotjar, Datadog, Winston for debugging and user analysis. Being able to maintain a project also means being able to solve issues in a fast and best of all preemptive manner. Those API calls watchers, heatmaps and performance analysis tools, would really help in that regard.

Though most of the above are missing from the project, I have implemented all of those on past projects. Its just a shame it takes quite a bit of time to do a fullstack solution with optimum quality control.
