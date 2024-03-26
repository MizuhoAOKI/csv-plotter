# csv-plotter
VSCode extension for plotting reference csv for autonomous driving race

## CSV column labels
`opt_x, opt_y, outer_width, inner_width, center_x, center_y, outer_x, outer_y, inner_x, inner_y, curvature, ref_v`

## Build the package 
- `cd csv-plotter`
- `npx vsce package`
    - `.vsix` file is saved in the workspace

## Install the package with a vsix file
- Launch VSCode
- "Ctrl + Shift + X" and open the extension menu
- Menu `...` -> Select "Install from VSIX" -> specify the vsix file in your PC.
