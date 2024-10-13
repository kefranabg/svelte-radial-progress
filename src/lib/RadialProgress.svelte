<script lang="ts">
	import { fade } from 'svelte/transition';

	type DataInput = {
		value: number;
		color: string;
	};

	// Props
	export let data: DataInput[] = [];
	export let maxTotalSize: number = data.reduce((sum, dataItem) => sum + dataItem.value, 0);
	export let thickness: number = 30;
	export let backgroundColor: string = '#D9D9D9';
	export let size: number | undefined = undefined;

	let rootElementWidth: number;
	let rootElementHeight: number;

	$: validThickness = thickness * 2 > diameter ? diameter / 2 : thickness; // Ensure progress bars thickness always fit in the circle to avoid UI glitches
	$: dataTotalSize = data.reduce((sum, dataItem) => sum + dataItem.value, 0);
	$: diameter = size || Math.min(rootElementWidth, rootElementHeight); // Use the provided fixed size or the smaller dimension as the diameter for better responsiveness
	$: validMaxTotalSize = dataTotalSize > maxTotalSize ? dataTotalSize : maxTotalSize; // Ensure maxTotalSize is not less than the data total size
	$: circumference = 2 * Math.PI * (diameter / 2 - validThickness / 2);
	$: progressData = data.map((dataItem, index) => {
		const value = (dataItem.value / validMaxTotalSize) * circumference;
		const offset = data
			.slice(0, index)
			.reduce((sum, m) => sum + (m.value / validMaxTotalSize) * circumference, 0);

		return {
			...dataItem,
			value,
			offset
		};
	});
</script>

<div
	bind:clientWidth={rootElementWidth}
	bind:clientHeight={rootElementHeight}
	class="progress-circle-container"
>
	{#if diameter}
		<div
			transition:fade={{ duration: 300 }}
			style="position: relative; height: {diameter}px; width: {diameter}px;"
		>
			<!-- Slot for the centered content -->
			<div class="progress-circle-slot">
				<slot />
			</div>

			<svg
				width="100%"
				height="100%"
				class="progress-circle"
				aria-label="Radial progress visualization"
				role="img"
			>
				<!-- Background circle -->
				<circle
					cx={diameter / 2}
					cy={diameter / 2}
					r={(diameter - validThickness) / 2}
					fill="none"
					stroke={backgroundColor}
					stroke-width={validThickness}
					role="presentation"
					aria-label="Radial progress background"
				/>

				<!-- Progress circles -->
				{#each progressData as progressDataItem}
					<circle
						cx={diameter / 2}
						cy={diameter / 2}
						r={(diameter - validThickness) / 2}
						fill="none"
						stroke={progressDataItem.color}
						stroke-width={validThickness}
						stroke-dasharray={`${progressDataItem.value} ${2 * Math.PI * ((diameter - validThickness) / 2) - progressDataItem.value}`}
						stroke-dashoffset={-progressDataItem.offset}
						class="progress-circle-animation"
						role="presentation"
						aria-label={`Progress ${progressDataItem.value} out of ${validMaxTotalSize} for ${progressDataItem.color}`}
					/>
				{/each}
			</svg>
		</div>
	{/if}
</div>

<style>
	.progress-circle-container {
		width: 100%;
		height: 100%;
	}

	.progress-circle-slot {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}

	.progress-circle {
		transform: rotate(-90deg);
	}

	.progress-circle-animation {
		transition:
			stroke-dasharray 0.2s,
			stroke-dashoffset 0.2s;
	}
</style>
