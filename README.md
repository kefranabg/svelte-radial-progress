<h1 align="center">🤗 Svelte Radial Progress</h1>

<p align="center">
   <img width="387" alt="Screenshot 2024-10-12 at 22 20 13" src="https://github.com/user-attachments/assets/c7cad131-5a46-4458-b3df-0ac42485c81d">
</p>

<br />

> **radial-progress-svelte** is a light-weight responsive SVG radial progress component for Svelte.

## ✨ Demo

[Click here to see a live demo](https://kefranabg.github.io/svelte-radial-progress-demo/)

## Install

```
npm i radial-progress-svelte
```

## Usage

```js
<script>
import { RadialProgress } from 'radial-progress-svelte';

const maxTotalSize = 150;
const thickness = 30;
const size = 200;
const data = [
	{ value: 40, color: '#2B2EFF' },
	{ value: 20, color: '#1761FF' },
	{ value: 60, color: '#1761FF' }
];

$: totalProgress = data.reduce((acc, curr) => acc + curr.value, 0);
</script>

<RadialProgress {data} {maxTotalSize} {thickness} {size}>
   <div>{totalProgress} / {maxTotalSize}</div>
</RadialProgress>
```

ℹ️ In case the size parameter is not provided, the radial progress component will automatically adjust its size to fit in the parent element.

## Component props

<table class="table table-bordered table-striped">
  <thead>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>default</th>
    <th>description</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>data</td>
      <td>Array<{ value: number, color: string }></td>
      <td>[]</td>
      <td>Dataset for the radial progress component</td>
    </tr>
    <tr>
      <td>maxTotalSize</td>
      <td>Number</td>
      <td>The total sum of the value from the `data` prop</td>
      <td>Specifies the maximum total size</td>
    </tr>
    <tr>
      <td>thickness</td>
      <td>Number</td>
      <td>30</td>
      <td>Specifies the thickness of the radial progress bar</td>
    </tr>
    <tr>
      <td>size</td>
      <td>Number</td>
      <td>undefined</td>
      <td>Specify a fixed size for the radial progress component. In case it's not provided, the component will automatically adjust its size to fit in the parent element, which is a better scenario in case you want responsiveness</td>
    </tr>
    <tr>
      <td>backgroundColor</td>
      <td>String</td>
      <td>'#D9D9D9'</td>
      <td>The color of the remaining space of the radial progress bar</td>
    </tr>
  </tbody>
</table>

## Component slots

<table class="table table-bordered table-striped">
  <thead>
  <tr>
    <th style="width: 40px;">name</th>
    <th style="width: 10px;">default</th>
    <th>description</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>Default</td>
      <td>Empty</td>
      <td>Content to be displayed inside the radial progress component</td>
    </tr>
  </tbody>
</table>

## Contribute

1. Fork the repo
2. Clone the forked repo

Install and run the project

```
npm install
npm run dev
```
