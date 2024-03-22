// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// Define Webview Content
function getWebviewContent(scriptUri: any, raceTrackChartConfig: any, velocityChartConfig: any, curvatureChartConfig: any) {
	return `<!DOCTYPE html>
	<head>
		<html>
		<meta charset="utf-8"/>
		<body>
			<h1>Race Track</h1>
			<canvas id="plot_racetrack" style="background-color: #333"></canvas>

			<h1>Velocity</h1>
			<canvas id="plot_velocity" style="background-color: #333"></canvas>
			
			<h1>Curvature</h1>
			<canvas id="plot_curvature" style="background-color: #333"></canvas>
			<script
			type="text/javascript"
			src="${scriptUri}">
			</script>
			<script type="text/javascript">
			const obj_plot_racetrack = document.getElementById("plot_racetrack");
            const plot_racetrack = new Chart(obj_plot_racetrack, ${JSON.stringify(raceTrackChartConfig)});

			const obj_plot_velocity = document.getElementById("plot_velocity");
			const plot_velocity = new Chart(obj_plot_velocity, ${JSON.stringify(velocityChartConfig)});

			const obj_plot_curvature = document.getElementById("plot_curvature");
			const plot_curvature = new Chart(obj_plot_curvature, ${JSON.stringify(curvatureChartConfig)});
			</script>
		</body>
		</html>
	</head>`;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('csv plotter is activated');

	// Say hello
	let disposable = vscode.commands.registerCommand('csv-plotter.plot', () => {
		// The command has been defined in the package.json file
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('csv-plotter is working');

		// create scatter plots
		function createPlotConfig() {
			// common settings
			let fontColor = "#999";

			// set xy scale as equal
			let raceTrackChartConfig = {
				type: "scatter",
				data: {
				datasets: [
					{
					label: "Optimal Path",
					data: [
						{x: 0, y: 0},
					],
					backgroundColor: "rgba(255, 99, 132, 0.2)", // fill color of the points
					borderColor: "rgba(255, 99, 132, 1)", // border color of the points
					borderWidth: 0.5,
					pointRadius: 0.5,
					showLine: true,
					},
					{
						label: "focus", // focused point on the optimal path
						data: [
						{x: 0, y: 0},
						],
						backgroundColor: "rgba(255, 99, 132, 0.1)", // fill color of the points
						borderColor: "rgba(255, 99, 132, 1)", // border color of the points
						borderWidth: 3,
						showLine: false,
						pointRadius: 8,
					},
					{
						label: "Center Line",
						data: [
							{x: 0, y: 0},
						],
						backgroundColor: "rgba(75, 192, 192, 0.2)", // fill color of the points
						borderColor: "rgba(75, 192, 192, 1)", // border color of the points
						borderWidth: 0.5,
						pointRadius: 0.5,
						showLine: true,
					},
					{
						label: "focus", // focused point on the center line
						data: [
						{x: 0, y: 0},
						],
						backgroundColor: "rgba(75, 192, 192, 0.1)", // fill color of the points
						borderColor: "rgba(75, 192, 192, 1)", // border color of the points
						borderWidth: 3,
						showLine: false,
						pointRadius: 8,
					},
					{
						label: "Outer Bound",
						data: [
							{x: 0, y: 0},
						],
						backgroundColor: "rgba(54, 162, 235, 0.2)", // fill color of the points
						borderColor: "rgba(54, 162, 235, 1)", // border color of the points
						borderWidth: 0.5,
						pointRadius: 0.5,
						showLine: true,
					},
					{
						label: "focus", // focused point on the outer bound
						data: [
						{x: 0, y: 0},
						],
						backgroundColor: "rgba(54, 162, 235, 0.1)", // fill color of the points
						borderColor: "rgba(54, 162, 235, 1)", // border color of the points
						borderWidth: 3,
						showLine: false,
						pointRadius: 8,
					},
					{
						label: "Inner Bound",
						data: [
							{x: 0, y: 0},
						],
						backgroundColor: "rgba(54, 162, 235, 0.2)", // fill color of the points
						borderColor: "rgba(54, 162, 235, 1)", // border color of the points
						borderWidth: 0.5,
						pointRadius: 0.5,
						showLine: true,
					},
					{
						label: "focus", // focused point on the inner bound
						data: [
						{x: 0, y: 0},
						],
						backgroundColor: "rgba(54, 162, 235, 0.1)", // fill color of the points
						borderColor: "rgba(54, 162, 235, 1)", // border color of the points
						borderWidth: 3,
						showLine: false,
						pointRadius: 8,
					},
				],
				},
				options: {
				animation: false,
				responsive: true,
				aspectRatio: 1,
				scales: {
					x: {
					type: "linear",
					position: "bottom",
					title: {
						display: true,
						text: "X",
						color: fontColor,
					},
					ticks: {
						color: fontColor,
					},
					},
					y: {
					type: "linear",
					position: "left",
					title: {
						display: true,
						text: "Y",
						color: fontColor,
					},
					ticks: {
						color: fontColor,
					},
					},
				},
				plugins: {
					legend: {
					display: true,
					labels: {
						// show legend only for 0, 1 datasets

						color: fontColor,
					},
					},
				},
				},
			};

			let velocityChartConfig = {
				type: "scatter",
				data: {
				datasets: [
					{
					label: "Reference Velocity",
					data: [
						{x: 0, y: 0},
					],
					backgroundColor: "rgba(255, 99, 132, 0.2)", // fill color of the points
					borderColor: "rgba(255, 99, 132, 1)", // border color of the points
					borderWidth: 0.5,
					pointRadius: 0.5,
					showLine: true,
					},
					{
						label: "Velocity of the Focused Point",
						data: [
						{x: 0, y: 0},
						],
						backgroundColor: "rgba(255, 99, 132, 0.1)", // fill color of the points
						borderColor: "rgba(255, 99, 132, 1)", // border color of the points
						borderWidth: 3,
						showLine: false,
						pointRadius: 8,
					},
				],
				},
				options: {
				animation: false,
				scales: {
					x: {
					type: "linear",
					position: "bottom",
					title: {
						display: true,
						text: "Points",
						color: fontColor,
					},
					ticks: {
						color: fontColor,
					},
					},
					y: {
					type: "linear",
					position: "left",
					title: {
						display: true,
						text: "Velocity",
						color: fontColor,
					},
					ticks: {
						color: fontColor,
					},
					},
				},
				plugins: {
					legend: {
					display: false,
					},
				},
				},
			};

			let curvatureChartConfig = {
				type: "scatter",
				data: {
				datasets: [
					{
					label: "Curvature",
					data: [
						{x: 0, y: 0},
					],
					backgroundColor: "rgba(255, 99, 132, 0.2)", // fill color of the points
					borderColor: "rgba(255, 99, 132, 1)", // border color of the points
					borderWidth: 1,
					showLine: true,
					pointRadius: 0.5,
					},
					{
						label: "Curvature of the Focused Point",
						data: [
						{x: 0, y: 0},
						],
						backgroundColor: "rgba(255, 99, 132, 0.1)", // fill color of the points
						borderColor: "rgba(255, 99, 132, 1)", // border color of the points
						borderWidth: 3,
						showLine: false,
						pointRadius: 8,
					},
				],
				},
				options: {
				animation: false,
				scales: {
					x: {
					type: "linear",
					position: "bottom",
					title: {
						display: true,
						text: "Curvature",
						color: fontColor,
					},
					ticks: {
						color: fontColor,
					},
					},
					y: {
					type: "linear",
					position: "left",
					title: {
						display: true,
						text: "Points",
						color: fontColor,
					},
					ticks: {
						color: fontColor,
					},
					},
				},
				plugins: {
					legend: {
					display: false,
					},
				},
				},
			};

			// Load CSV file
			let editor = vscode.window.activeTextEditor;
			if (!editor) {
				// vscode.window.showErrorMessage("No active editor found");
				return;
			}
			let doc = editor.document;
			let focus_position = editor.selection.active; // get cursur position
			let focus_line = doc.lineAt(focus_position.line); // get current line
			let text = doc.getText(); // get the whole text

			// parse csv
			let lines = text.split('\n');

			//// race track plot
			let order_opt_path = 0;
			let order_focus_opt_path = 1;
			let order_center_line = 2;
			let order_focus_center_line = 3;
			let order_outer_bound = 4;
			let order_focus_outer_bound = 5;
			let order_inner_bound = 6;
			let order_focus_inner_bound = 7;
			//// velocity plot
			let order_velocity = 0;
			let order_focus_velocity = 1;
			//// curvature plot
			let order_curvature = 0;
			let order_focus_curvature = 1;

			//// csv column indices
			let col_opt_path_x = 0;
			let col_opt_path_y = 1;
			let col_center_line_x = 4;
			let col_center_line_y = 5;
			let col_outer_bound_x = 6;
			let col_outer_bound_y = 7;
			let col_inner_bound_x = 8;
			let col_inner_bound_y = 9;
			let col_curvature = 10;
			let col_velocity = 11;

			let data_opt_path = [];
			let data_center_line = [];
			let data_outer_bound = [];
			let data_inner_bound = [];
			let data_curvature = [];
			let data_velocity = [];

			let focus_data_opt_path = [];
			let focus_data_center_line = [];
			let focus_data_outer_bound = [];
			let focus_data_inner_bound = [];
			let focus_data_curvature = [];
			let focus_data_velocity = [];

			for (let i = 0; i < lines.length; i++) {
				let items = lines[i].split(',');
				data_opt_path.push({x: parseFloat(items[col_opt_path_x]), y: parseFloat(items[col_opt_path_y])});
				data_center_line.push({x: parseFloat(items[col_center_line_x]), y: parseFloat(items[col_center_line_y])});
				data_outer_bound.push({x: parseFloat(items[col_outer_bound_x]), y: parseFloat(items[col_outer_bound_y])});
				data_inner_bound.push({x: parseFloat(items[col_inner_bound_x]), y: parseFloat(items[col_inner_bound_y])});
				data_curvature.push({x: i, y: parseFloat(items[col_curvature])});
				data_velocity.push({x: i, y: parseFloat(items[col_velocity])});

				// focus data
				if (i == focus_line.lineNumber) {
					focus_data_opt_path.push({x: parseFloat(items[col_opt_path_x]), y: parseFloat(items[col_opt_path_y])});
					focus_data_center_line.push({x: parseFloat(items[col_center_line_x]), y: parseFloat(items[col_center_line_y])});
					focus_data_outer_bound.push({x: parseFloat(items[col_outer_bound_x]), y: parseFloat(items[col_outer_bound_y])});
					focus_data_inner_bound.push({x: parseFloat(items[col_inner_bound_x]), y: parseFloat(items[col_inner_bound_y])});
					focus_data_curvature.push({x: i, y: parseFloat(items[col_curvature])});
					focus_data_velocity.push({x: i, y: parseFloat(items[col_velocity])});
				}
			}
			raceTrackChartConfig.data.datasets[order_opt_path   ].data = data_opt_path;
			raceTrackChartConfig.data.datasets[order_focus_opt_path].data = focus_data_opt_path;
			raceTrackChartConfig.data.datasets[order_center_line].data = data_center_line;
			raceTrackChartConfig.data.datasets[order_focus_center_line].data = focus_data_center_line;
			raceTrackChartConfig.data.datasets[order_outer_bound].data = data_outer_bound;
			raceTrackChartConfig.data.datasets[order_focus_outer_bound].data = focus_data_outer_bound;
			raceTrackChartConfig.data.datasets[order_inner_bound].data = data_inner_bound;
			raceTrackChartConfig.data.datasets[order_focus_inner_bound].data = focus_data_inner_bound;
			velocityChartConfig.data.datasets[order_velocity].data = data_velocity;
			velocityChartConfig.data.datasets[order_focus_velocity].data = focus_data_velocity;
			curvatureChartConfig.data.datasets[order_curvature].data = data_curvature;
			curvatureChartConfig.data.datasets[order_focus_curvature].data = focus_data_curvature;

			return [raceTrackChartConfig, velocityChartConfig, curvatureChartConfig];
		}

		// Show Webview
        const panel = vscode.window.createWebviewPanel(
          'csv_plot', // id for the webview used internally
          'csv_plot', // tab title displayed to the user
          vscode.ViewColumn.One,
		  {
			enableScripts: true,
		  }
        );
		let plotConfig = createPlotConfig();
		// Get library paths
		// let libPath = vscode.Uri.file(
		// 	path.join(
		// 		context.extensionPath,
		// 		"node_modules",
		// 		"chart.js",
		// 		"dist",
		// 		"chart.js"
		// 	)
		// )
		
		let libPath = vscode.Uri.joinPath(
			context.extensionUri,
			"node_modules",
			"chart.js",
			"dist",
			"chart.min.js"
		);

		let scriptUri = panel.webview.asWebviewUri(libPath);
		console.log(scriptUri);

		// solve plotConfig can be undefined
		if (plotConfig === undefined) {
			return;
		}
        panel.webview.html = getWebviewContent(scriptUri, plotConfig[0], plotConfig[1], plotConfig[2]);

		// Highlight the current line
		let activeEditor = vscode.window.activeTextEditor;
		let decoration = vscode.window.createTextEditorDecorationType({
			backgroundColor: 'rgba(220,220,220,.3)'
		});

		function updateDecorations() {
			if (!activeEditor) {
				return;
			}
			
			const doc = activeEditor.document;
			const selection = activeEditor.selection;
			const start = new vscode.Position(selection.start.line, 0);
			const end = new vscode.Position(selection.start.line + 1, 0);
			const range = new vscode.Range(start, end);
	
			activeEditor.setDecorations(decoration, [range]);
		}

		function onFocusUpdate(){
			// Log
			console.log('onFocusUpdate');

			// Update Text Highlight
			updateDecorations();

			// Update Webview
			plotConfig = createPlotConfig();
			if (plotConfig === undefined) {
				return;
			}
			panel.webview.html = getWebviewContent(scriptUri, plotConfig[0], plotConfig[1], plotConfig[2]);
		}

		vscode.window.onDidChangeActiveTextEditor(editor => {
			activeEditor = editor;
			if (editor) {
				onFocusUpdate();
			}
		}, null, context.subscriptions);
	
		vscode.window.onDidChangeTextEditorSelection(() => {
			onFocusUpdate();
		}, null, context.subscriptions);

	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
