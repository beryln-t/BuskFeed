# BuskFeed

## What is BuskFeed?

BuskFeed is a web application built to provide a platform to showcase street performers (Buskers) and their talents. The app has full CRUD functions and allows administrators to create, read, update and delete busking events and busker profiles.The basic functionality of this app is very versatile and can be modified to be used in other contexts. For instance, as an app to publicize pop-up events for small business owners and more

[Click here](https://buskfeed.cyclic.app/) to try the App.

## Model

The App consists of 3 data models- User, Busker, and Event.

Each user (the administrator) can create many events and many busker profiles. The event model references the busker model in a many-to-one relationship where each busker can have many events.

<p align="center"><img src="https://github.com/beryln-t/project-2/blob/main/images/model.png?raw=true" width="100%" height="100%"> </p>
 <p align="center">[Model Relationship Map]</p>

## Screenshots

<p align="center"><img src="https://i.imgur.com/FLGxXPt.png" width="100%" height="100%"> </p>
 <p align="center">[Event Index]</p>

<p align="center"><img src="https://i.imgur.com/QyZI36r.png" width="100%" height="100%"> </p>
 <p align="center">[Busker Index]</p>

<p align="center"><img src="https://i.imgur.com/phdKIiN.png" width="100%" height="100%"> </p>
 <p align="center">[Manage Events]</p>

 <p align="center"><img src="https://i.imgur.com/3EvVzPp.png" width="100%" height="100%"> </p>
 <p align="center">[Manage Buskers]</p>

## Technologies Used

BuskFeed is built using the following technologies:

- Node.js
- Express.js Frameworks
- MongoDB
- JavaScript
- CSS
- EJS
- Cyclic Deployment
- Git & GitHub

## Key Development Considerations

### 1.Authorization

Since it is an event management system, only administrators should be allowed to make edits. Hence a layer of authorization were added to block public access to admin pages.

```javascript
const login = async (req, res) => {
  const { userid, password } = req.body;

  const user = await User.findOne({ userid }).exec();
  if (user === null) {
    const context = { msg: "Login Unsuccessful. Please check login details." };
    res.render("users/login", context);
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      req.session.userid = user._id;
      res.redirect("/events");
    } else {
      const context = {
        msg: "Login Unsuccessful. Please check login details.",
      };
      res.render("users/login", context);
    }
  });
};
```

### 2. Validation of Forms

Forms of data validation was added in both the model and view section.

#### [In Model]

For instance, in the busker schema, the LOE Number (Letter of Endorsement) includes validators to check that the data contains exactly 8 alphanumeric characters and that LOE Numbers are not duplicated with the "unique" validator.

```javascript
const buskerSchema = new Schema(
  {
    buskerName: { type: String, required: true },
    buskingAct: { type: String, required: true },
    loeNumber: {
      type: String,
      minLength: 8,
      maxLength: 8,
      unique: true,
      required: true,
    },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true, min: Date() },
  },
  {
    timestamps: true,
  }
);
```

#### [In View]

Similarly, in the view, the LOE Number has validators to check that the data contains exactly 8 alphanumeric characters before it is passed into the database.

```javascript
<div class="mb-3">
  <label for="loeNumber" class="form-label">
    LOE Number:
  </label>
  <input
    type="text"
    class="form-control"
    id="loeNumber"
    name="loeNumber"
    required
    pattern="^[a-zA-Z0-9]{8}$"
    oninvalid="this.setCustomValidity('Please enter a valid 8-character alphanumeric LOE number.')"
    oninput="this.setCustomValidity('')"
    title="Please enter a valid 8-character alphanumeric LOE number."
  />
</div>
```

### 3. User Experience

User experience was also taken into consideration when building the app. For instance, both event index and busker index are sorted to optimize user experience.

#### [Event Index]

Events are sorted according to event date, with the latest being shown at the top of the page.

```javascript
const index = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.find()
      .populate("buskerName")
      .sort({ eventDate: -1 })
      .exec();
    res.render("events/index", { id, event, dayjs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
```

#### [Busker Index]

Buskers are sorted according to alphabetical order

```javascript
const index = async (req, res) => {
  try {
    const id = req.params.id;
    const busker = await Busker.find().sort({ buskerName: "asc" }).exec();
    res.render("buskers/index", { busker, id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
```

## Future Enhancements and Developments

- Add search function
- Add function to insert images for events and busker profile
- Add function to sort data in "manage" sections
- Add further authorization layer to filter access to editing events and buskers according to user
- Add commenting/bookmarking ability
- Removing related events when busker profile is deleted

## Key Takeaways

- Just like project 1, do not neglect the initial planning stage. Proper model schema planning will make everything (routing etc) much easier
- Creativity and flexibility are crucial, there will be road-blocks and it will be necessary to abort the mission and think of other ways to achieve your goal via other solutions
