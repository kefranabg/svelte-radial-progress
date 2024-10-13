<script lang="ts">
	import RadialProgress from '$lib/RadialProgress.svelte';
	import '../app.css';

	let progressData = [
		{ value: 40, color: '#2B2EFF' },
		{ value: 20, color: '#1761FF' }
	];
	let maxTotalSize = 150;
	let thickness = 30;
	let containerHeight = 300;
	let containerWidth = 300;
	let backgroundColor = '#D6D6D6';

	$: totalProgressData = progressData.reduce((acc, curr) => acc + curr.value, 0);
	$: totalMax = totalProgressData > maxTotalSize ? totalProgressData : maxTotalSize;

	function getRandomColor() {
		return `#${Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, '0')}`;
	}

	function addProgressData() {
		progressData = [...progressData, { value: 10, color: getRandomColor() }];
	}
</script>

<div
	class="w-screen h-screen bg-gradient-to-r from-sky-500 to-indigo-500 font-mono overflow-scroll"
>
	<h1 class="text-white text-4xl font-bold py-4 pt-8 text-center">🤗 Svelte Radial Progress</h1>
	<div class="p-2 flex flex-wrap justify-evenly">
		<div class="flex flex-col p-8">
			<h2 class="text-white text-lg font-bold">Radial progress</h2>
			<div class="flex mt-2">
				<label for="maxTotalSize" class="text-white mr-2">Max total size</label>
				<input
					class="w-40"
					id="maxTotalSize"
					type="range"
					bind:value={maxTotalSize}
					min="0"
					max={500}
				/>
			</div>

			<div class="flex mt-2">
				<label for="maxTotalSize" class="text-white mr-2">Thickness</label>
				<input
					class="w-40"
					id="maxTotalSize"
					type="range"
					bind:value={thickness}
					min="1"
					max="300"
				/>
			</div>

			<div class="flex mt-2">
				<label for="backgroundColor" class="text-white mr-2">Background color</label>
				<input
					class="bg-transparent"
					id="backgroundColor"
					type="color"
					bind:value={backgroundColor}
				/>
			</div>
		</div>
		<div class="flex flex-col p-8">
			<h2 class="text-white text-lg font-bold">Parent Container</h2>
			<div class="flex items-center mt-2">
				<label for="containerHeight" class="text-white mr-2">Height</label>
				<input
					class="w-40"
					id="containerHeight"
					type="range"
					bind:value={containerHeight}
					min="200"
					max="500"
				/>
			</div>
			<div class="flex items-center mt-2">
				<label for="containerWidth" class="text-white mr-2">Width</label>
				<input
					class="w-40"
					id="containerWidth"
					type="range"
					bind:value={containerWidth}
					min="200"
					max="500"
				/>
			</div>
		</div>

		<div class="flex flex-col p-8">
			<h2 class="text-white text-lg font-bold mb-2">
				Progress Bars
				<button
					class="bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold rounded w-6 h-6 ml-2"
					on:click={addProgressData}>+</button
				>
			</h2>
			<div class="flex flex-row flex-wrap gap-4 max-w-md">
				{#each progressData as data, index}
					<div>
						<input class="mr-4 bg-transparent" type="color" bind:value={data.color} />
						<input id="value-{index}" type="range" bind:value={data.value} min="1" max="50" />
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="flex items-center justify-center mt-4">
		<div
			style="height: {containerHeight}px; width: {containerWidth}px;"
			class="border-2 border-white p-4 rounded-lg"
		>
			<RadialProgress data={progressData} {maxTotalSize} {thickness} {backgroundColor}>
				<div class="flex flex-col items-center justify-center">
					<div class="text-white text-lg font-bold">Storage</div>
					<div class="text-white text-lg">{totalProgressData}/{totalMax}GB</div>
				</div>
			</RadialProgress>
		</div>
	</div>
</div>
