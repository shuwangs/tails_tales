# Milo Diary Search Annotations

These relevance labels were drafted from the content of the 51 diary entries without using model retrieval results. They are pending human review. Each query is judged against the entire corpus; entries not listed are treated as irrelevant. Multi-concept queries must satisfy all key conditions. An empty list means no entry supports the requested event.

| Query ID | Query | Relevant diary IDs | Rationale |
| --- | --- | --- | --- |
| q001 | When did Milo watch birds by the window? | 24, 25 | Both entries explicitly describe watching birds by a window. |
| q002 | Playing with a ball indoors because it was raining | 23 | Entry 23 includes rain, indoor play, and chasing a ball. Entry 26 describes sleeping instead. |
| q003 | Sleeping inside on a rainy afternoon | 26 | Entry 26 explicitly describes napping indoors on a rainy afternoon. Entry 32 mentions thunder but does not establish an afternoon or rain. |
| q004 | Climbing the cat tree | 19, 22 | Both entries explicitly mention climbing the cat tree. |
| q005 | Playing chase with another cat | 27 | Entry 27 describes taking turns chasing another cat. |
| q006 | Running around the apartment after sunset | 28 | Entry 28 includes both running around the apartment and the time just after sunset. |
| q007 | Chasing a little red dot | 30 | Entry 30 explicitly describes chasing a little red dot; no assumption about the device producing it is needed. |
| q008 | Exploring plants and bugs in the catio | 21 | Entry 21 describes sniffing plants and watching insects in the catio. |
| q009 | Learning to jump over something for a reward | 29 | Entry 29 describes learning to jump over a small obstacle for treats. |
| q010 | Waiting on the mat when asked | 38 | Entry 38 describes waiting on the mat for twenty seconds when asked. |
| q011 | Coming over when I called his name | 48 | Entry 48 describes running over when his human calls his name. |
| q012 | Turning down breakfast | 13 | Entry 13 describes sniffing breakfast and leaving without eating. Entry 14 describes finishing breakfast and wanting more. |
| q013 | Finishing breakfast and asking for more | 14 | Entry 14 includes both finishing breakfast and asking for another serving. |
| q014 | Trying salmon kibble mixed into his usual food | 15 | Entry 15 explicitly describes trying salmon kibble mixed into his regular food. |
| q015 | Refusing wet food but still eating dry food | 18 | Entry 18 describes rejecting fish-flavored wet food while happily eating dry kibble, rather than refusing all food. |
| q016 | Eating slowly with a puzzle feeder | 17 | Entry 17 describes eating dinner slowly because of a puzzle feeder. |
| q017 | Getting extra hungry after playing | 19 | Entry 19 explicitly links a long play session to extra hunger and quickly finishing dinner. |
| q018 | Enjoying a freshly cleaned water bowl | 20 | Entry 20 describes enjoying water after the bowl is washed and refilled. Entry 10 describes drinking unusually often. |
| q019 | Hiding because of thunder | 31 | Entry 31 describes hiding under the table and trembling because of thunder. Entry 32 explicitly says the noise did not bother him. |
| q020 | Sleeping through a thunderstorm | 32 | Entry 32 describes sleeping peacefully during thunder. Entry 31 describes fear instead. |
| q021 | Hiding from visitors | 35 | Entry 35 describes hiding behind the sofa until unfamiliar visitors leave. Entry 36 describes approaching visitors willingly. |
| q022 | Relaxing on the couch with guests | 36 | Entry 36 describes calmly approaching visitors and curling up beside them on the couch. |
| q023 | Greeting me excitedly when I got home | 33 | Entry 33 describes running to the door with a raised tail and loud meows when his human returns. |
| q024 | The time Milo chewed my shoelace | 37 | Entry 37 explicitly describes chewing a shoelace before his human replaces it with a safe toy. |
| q025 | Getting a new toy for his birthday | 45 | Entry 45 describes receiving a new mouse toy on his birthday. Entries 30 and 37 have toys but no birthday context. |
| q026 | Celebrating a year since adoption | 49 | Entry 49 explicitly celebrates one year since adoption. |
| q027 | Settling into a new home | 46 | Entry 46 describes exploring a new apartment and gradually feeling safe enough to sleep in a new bed. |
| q028 | Kneading a soft new blanket | 47 | Entry 47 describes receiving a fleece blanket, kneading it, and sleeping on it. |
| q029 | Ear discomfort | 1, 39 | Entry 1 describes itchy ears, scratching, and head shaking. Entry 39 describes an ear infection. Entry 2 explicitly describes comfortable, healthy ears. |
| q030 | Not feeling like playing, even with his favorite toy | 9 | Entry 9 describes sleeping most of the afternoon and declining to play even with his favorite feather wand. |
| q031 | Getting itchy after trying a new chicken treat | 16 | Entry 16 describes neck itching after a new chicken treat. Entry 11 describes itching after rolling on grass instead. |
| q032 | Trouble putting weight on a back leg | 5, 41 | Entry 5 describes avoiding weight on the left hind leg. Entry 41 describes a vet visit for limping on that leg. Entry 6 explicitly describes no limping. |
| q033 | Taking Milo on an airplane | [] (no relevant entries) | No entry describes traveling on an airplane. |
| q034 | Milo swimming in a pool | [] (no relevant entries) | No entry describes swimming or visiting a pool. |
| q035 | Staying overnight at a boarding cattery | [] (no relevant entries) | No entry describes an overnight boarding stay. Moving to a new home and visiting a vet do not qualify. |
| q036 | Milo knocking a flower vase off the table | [] (no relevant entries) | No entry describes knocking over a flower vase. Observing plants does not match this event. |
| q037 | Trying out an automatic litter box | [] (no relevant entries) | No entry describes an automatic litter box or trying a litter box. |
| q038 | Wearing a costume for Halloween | [] (no relevant entries) | No entry describes a Halloween costume. A birthday celebration is a different event. |
| q039 | Milo had itchy ears | 1, 39 | Entry 1 describes Milo having itchy ears. Entry 39 explicitly mentions ear itching and visited vet. |
| q040 | Milo's ears were not itchy | 2 | Entry 2 explicitly mentions that Milo's ears were not itchy. |
| q041 | Milo refused to eat breakfast | 13 | Entry 13 explicitly mentions that Milo refused to eat breakfast. |
| q042 | Milo did not refuse breakfast and ate everything | 14 | Entry 14 explicitly mentions that Milo ate everything. |
| q043 | Milo was limping | 5, 41 | Entry 5 mentions Milo limping. Entry 41 also mentions Milo limping. |
| q044 | Milo was not limping | 6 | Entry 6 explicitly mentions that Milo was not limping. |
| q045 | Milo was frightened by thunder | 31 | Entry 31 explicitly mentions that Milo was frightened by thunder. |
| q046 | Milo was not frightened by thunder | 32 | Entry 32 explicitly mentions that Milo was not frightened by thunder. |

## Queries by Diary Entry

Entries without a matching query remain retrieval candidates. Diary topic categories and query relevance labels serve different purposes.

| Diary ID | Title | Matching queries |
| --- | --- | --- |
| 1 | A Restless Night | q029, q039 |
| 2 | An Easy Morning | q040 |
| 3 | A Quiet Evening Together | None yet |
| 4 | Dinner, Then Sofa Time | None yet |
| 5 | An Awkward Landing | q032, q043 |
| 6 | My Hallway Is a Racetrack | q044 |
| 7 | The Window Needed Cleaning | None yet |
| 8 | An Afternoon Beside My Human | None yet |
| 9 | Just Not Feeling Playful | q030 |
| 10 | Back at the Water Bowl | None yet |
| 11 | Catio Time Took a Turn | None yet |
| 12 | One of Those Good Days | None yet |
| 13 | Not This Morning | q012, q041 |
| 14 | Could I Have Seconds? | q013, q042 |
| 15 | Something Different in My Bowl | q014 |
| 16 | A Treat That Didn’t Agree With Me | q031 |
| 17 | Working for My Dinner | q016 |
| 18 | I Had Other Dinner Plans | q015 |
| 19 | Play First, Dinner Second | q004, q017 |
| 20 | A Fresh Refill | q018 |
| 21 | My Little Outdoor Round | q008 |
| 22 | The Best Seat in the Room | q004 |
| 23 | Rain Changed Our Plans | q002 |
| 24 | A Very Busy Window | q001 |
| 25 | My Sunny Seat | q001 |
| 26 | Staying In | q003 |
| 27 | A Game With My Housemate | q005 |
| 28 | My Evening Burst of Energy | q006 |
| 29 | We Learned Something Together | q009 |
| 30 | The Dot Got Away Again | q007 |
| 31 | A Loud Evening | q019, q045 |
| 32 | Too Cozy to Notice | q020, q046 |
| 33 | You’re Finally Back | q023 |
| 34 | Who Rang the Bell? | None yet |
| 35 | Too Much Company Today | q021 |
| 36 | A Nice Afternoon With Guests | q022 |
| 37 | That Wasn’t My Toy | q024 |
| 38 | Twenty Whole Seconds | q010 |
| 39 | A Visit About My Ears | q029, q039 |
| 40 | A Quick Trip Out | None yet |
| 41 | Taking It Slowly | q032, q043 |
| 42 | Home After the Dentist | None yet |
| 43 | Someone Checked My Eyes | None yet |
| 44 | An Ordinary Checkup | None yet |
| 45 | A Little Birthday Celebration | q025 |
| 46 | Getting to Know This Place | q027 |
| 47 | This Blanket Is Mine Now | q028 |
| 48 | Did Someone Call Me? | q011 |
| 49 | A Whole Year Together | q026 |
| 50 | Looking a Little Tidier | None yet |
| 51 | Relaxing Evening | None yet |
