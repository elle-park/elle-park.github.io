function am4themes_myTheme(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      am4core.color("#9647e6")

    ];
  }
}

// Themes begin
am4core.useTheme(am4themes_myTheme);
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.PieChart);

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "hours";
pieSeries.dataFields.category = "schedule";

// Let's cut a hole in our Pie chart the size of 30% the radius
chart.innerRadius = am4core.percent(50);

// Put a thick white border around each Slice
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
pieSeries.slices.template
  // change the cursor on hover to make it apparent the object can be interacted with
  .cursorOverStyle = [
    {
      "property": "cursor",
      "value": "pointer"
    }
  ];

pieSeries.alignLabels = false;
pieSeries.labels.template.bent = true;
pieSeries.labels.template.radius = 3;
pieSeries.labels.template.padding(0,0,0,0);

pieSeries.ticks.template.disabled = true;

// Create a base filter effect (as if it's not there) for the hover to return to
var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
shadow.opacity = 0;

// Create hover state
var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

// Slightly shift the shadow and make it more prominent on hover
var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
hoverShadow.opacity = 0.7;
hoverShadow.blur = 5;

// Add a legend
chart.legend = new am4charts.Legend();

chart.data = [{
  "schedule": "Classes",
  "hours": 4,
  "description": "This semester, all of my classes are online. On average, I spend about 4 hours on Zoom per day for classes. Some days, it's as little as 1-2 hours of class but at the most, I spend 6 and a half hours in class. In some of my classes, I am looking at lectures on my laptop and taking notes on my iPad. By November, this process has definitely taken a toll on my physical health, as my eyes rarely get to rest.",
  "online": 4
},{
  "schedule": "Studying/Homework",
  "hours": 5.5,
  "description": "Most of my homeworks are coding assignments, writing essays, or reading papers. With the exception of math homework, which is usually done on paper, I am on my laptop doing work. On extremely busy weeks, my computer recorded that I was on my computer for 13 hours in a single day. Sometimes, I try to print out my readings to step away from my iPad, but the pages are long and printing feels wasteful.",
  "online": 5
}, {
  "schedule": "Free time",
  "hours": 3,
  "description": "Free time varies anywhere from taking a nap to calling my friends to applying to jobs! I realized that almost all of the things I do on my free time still involves looking at the computer, iPad, or my phone. Unless I am reading a paper book or cooking in my free time, I'm usually watching Netflix on my iPad, calling my friends on Zoom/FaceTime, or online shopping.",
  "online": 2.5
}, {
  "schedule": "Eating",
  "hours": 3,
  "description": "Currently, I am at home living with my parents. We usually wake up at different times so I eat breakfast and read the news on my phone. Some days, we eat lunch together, but usually I'm eating during my class at noon. During dinner, my family always eat together and all of us stay away from our phones to talk and take time off from the Internet.",
  "online": 1.5
}, {
  "schedule": "Exercise",
  "hours": 1.5,
  "description": "Because I don't have to walk to classes, I have to remind myself to go outside sometimes. I exercise almost daily and go on a short walk in between classes to get my steps in and stay healthy. Usually, I'm playing music in the background, but I'm not looking at my phone.",
  "online": 0
}, {
  "schedule": "Sleep",
  "hours": 7,
  "description": "When I lived on campus, I used to have very unhealthy sleeping habits. During quarantine, I've gotten better at establishing a solid sleep schedule. Unless it's a busy week, I get about 7 hours of sleep everyday. I spend about half an hour looking at my phone to text my friends, scroll through social media, or play Netflix in the background.",
  "online": 0.5
}];

// Start info with US averages
var info = document.getElementById("info");
info.innerHTML = "<h3> Calculating Screen Time by Daily Breakdown </h3> <br>";
info.innerHTML += "<h4> On average during the week, I spend around 13.5 hours a day looking at a monitor. </h4><br>"
info.innerHTML += "Please click on the chart to see the description of each activity!"

// Onclick for states, open its stats
pieSeries.slices.template.events.on("hit", function(ev) {
  var info = document.getElementById("info");
  let series = ev.target.dataItem.component;
  series.slices.each(function(item) {
    sched = ev.target.dataItem.dataContext.schedule
    hr = ev.target.dataItem.dataContext.hours
    des = ev.target.dataItem.dataContext.description
    on_hr = ev.target.dataItem.dataContext.online
    info.innerHTML = "<h3> Calculating Screen Time by Daily Breakdown </h3> <br>";
    if (sched) {
      info.innerHTML += "<h4>" + "Schedule: " + sched + "<br>" + "Average hours spent: " + hr + "<br>"
                        + "Time spent online or looking at a screen: " + on_hr + " hours </h4> <br>";
      info.innerHTML += des;
    }
    else {
      info.innerHTML = "No description given";
    }
  })
});
