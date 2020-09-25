let earnings = await loadEarnings();
let widget = await createWidget(earnings);

// check if the script is running in a widget, if not, show a preview of the widget to make it easy to debug
if (!config.runsInWidget) {
  await widget.presentMedium();
}

// Tell system to show the widget
Script.setWidget(widget);
Script.complete();

async function createWidget(earnings) {
  let today = "$" + earnings.today.toString();
  let currentMonth = "$" + earnings.current_month.toString();
  let gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [new Color("#d6e6f1"), new Color("#333333")];

  let w = new ListWidget();

  w.backgroundColor = new Color("#555");
  w.backgroundGradient = gradient;
  w.addSpacer();

  let titleText = w.addText("Sales today");
  titleText.font = Font.boldSystemFont(12);
  titleText.textColor = Color.white();
  w.addSpacer(8);

  let earningsText = w.addText(today);
  earningsText.font = Font.boldSystemFont(40);
  earningsText.textColor = Color.white();

  let monthEarnings = w.addText(currentMonth);
  monthEarnings.font = Font.boldSystemFont(14);
  monthEarnings.textColor = Color.white();

  return w;
}

// config here
async function loadEarnings() {
  let site = "";
  let key = "";
  let token = "";

  let url = `${site}/edd-api/stats/?key=${key}&token=${token}&type=earnings`;
  let req = new Request(url);
  let json = await req.loadJSON();
  return json.earnings;
}
