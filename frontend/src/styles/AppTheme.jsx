import { createTheme } from "flowbite-react";

export const appTheme = createTheme({
	root: {},
	avatar: {
		root: {
			base: "flex items-center justify-center space-x-4 rounded",
			inner: "relative",
			bordered: "p-1 ring-2",
			rounded: "rounded-full",
			color: {
				dark: "ring-gray-800 dark:ring-gray-800",
				failure: "ring-red-500 dark:ring-red-700",
				gray: "ring-gray-500 dark:ring-gray-400",
				info: "ring-cyan-400 dark:ring-cyan-800",
				light: "ring-gray-300 dark:ring-gray-500",
				purple: "ring-purple-500 dark:ring-purple-600",
				success: "ring-green-500 dark:ring-green-500",
				warning: "ring-yellow-300 dark:ring-yellow-500",
				pink: "ring-pink-500 dark:ring-pink-500",
			},
			img: {
				base: "rounded",
				off: "relative overflow-hidden bg-gray-100 dark:bg-gray-600",
				on: "",
				placeholder: "absolute -bottom-1 h-auto w-auto text-gray-400",
			},
			size: {
				xs: "h-6 w-6",
				sm: "h-8 w-8",
				md: "h-10 w-10",
				lg: "h-20 w-20",
				xl: "h-36 w-36",
			},
			stacked: "ring-2 ring-gray-300 dark:ring-gray-500",
			statusPosition: {
				"bottom-left": "-bottom-1 -left-1",
				"bottom-center": "-bottom-1",
				"bottom-right": "-bottom-1 -right-1",
				"top-left": "-left-1 -top-1",
				"top-center": "-top-1",
				"top-right": "-right-1 -top-1",
				"center-right": "-right-1",
				center: "",
				"center-left": "-left-1",
			},
			status: {
				away: "bg-yellow-400",
				base: "absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800",
				busy: "bg-red-400",
				offline: "bg-gray-400",
				online: "bg-green-400",
			},
			initials: {
				text: "font-medium text-gray-600 dark:text-gray-300",
				base: "relative inline-flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-600",
			},
		},
		group: {
			base: "flex -space-x-4",
		},
		groupCounter: {
			base: "relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-xs font-medium text-white ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500",
		},
	},
	navbar: {
		root: {
			base: "bg-white px-2 py-2.5 sm:px-4 dark:border-gray-700 dark:bg-gray-800",
			rounded: {
				on: "rounded",
				off: "",
			},
			bordered: {
				on: "border",
				off: "",
			},
			inner: {
				base: "mx-auto flex flex-wrap items-center justify-between",
				fluid: {
					on: "",
					off: "container",
				},
			},
		},
		brand: {
			base: "flex items-center",
		},
		collapse: {
			base: "w-full md:block md:w-auto",
			list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
			hidden: {
				on: "hidden",
				off: "",
			},
		},
		link: {
			base: "block py-2 pl-3 pr-4 md:p-0",
			active: {
				on: "bg-primary-700 text-white md:bg-transparent md:text-primary-700 dark:text-white",
				off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-primary-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white",
			},
			disabled: {
				on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
				off: "",
			},
		},
		toggle: {
			base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
			icon: "h-6 w-6 shrink-0",
			title: "sr-only",
		},
	},
	button: {
		base: "relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4",
		disabled: "pointer-events-none opacity-50",
		fullSized: "w-full",
		grouped: "rounded-none border-l-0 first:rounded-s-lg first:border-l last:rounded-e-lg focus:ring-2",
		pill: "rounded-full",
		size: {
			xs: "h-8 px-3 text-xs",
			sm: "h-9 px-3 text-sm",
			md: "h-10 px-5 text-sm",
			lg: "h-12 px-5 text-base",
			xl: "h-[52px] px-6 text-base",
		},
		color: {
			default:
				"bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
			alternative:
				"border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700",
			blue: "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
			cyan: "bg-cyan-700 text-white hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800",
			dark: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
			gray: "bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
			green: "bg-green-700 text-white hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
			indigo: "bg-indigo-700 text-white hover:bg-indigo-800 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800",
			light: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
			lime: "bg-lime-700 text-white hover:bg-lime-800 focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800",
			pink: "bg-pink-700 text-white hover:bg-pink-800 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800",
			purple: "bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800",
			red: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
			teal: "bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
			yellow: "bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-900",
		},
		outlineColor: {
			default:
				"border border-primary-700 text-primary-700 hover:border-primary-800 hover:bg-primary-800 hover:text-white focus:ring-primary-300 dark:border-primary-600 dark:text-primary-500 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white dark:focus:ring-primary-800",
			blue: "border border-blue-700 text-blue-700 hover:border-blue-800 hover:bg-blue-800 hover:text-white focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:border-blue-700 dark:hover:bg-blue-700 dark:hover:text-white dark:focus:ring-blue-800",
			cyan: "border border-cyan-700 text-cyan-700 hover:border-cyan-800 hover:bg-cyan-800 hover:text-white focus:ring-cyan-300 dark:border-cyan-500 dark:text-cyan-500 dark:hover:border-cyan-700 dark:hover:bg-cyan-700 dark:hover:text-white dark:focus:ring-cyan-800",
			dark: "border border-gray-800 text-gray-800 hover:border-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800",
			gray: "border border-gray-700 text-gray-700 hover:border-gray-800 hover:bg-gray-800 hover:text-white focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-800",
			green: "border border-green-700 text-green-700 hover:border-green-800 hover:bg-green-800 hover:text-white focus:ring-green-300 dark:border-green-600 dark:text-green-500 dark:hover:border-green-700 dark:hover:bg-green-700 dark:hover:text-white dark:focus:ring-green-800",
			indigo: "border border-indigo-700 text-indigo-700 hover:border-indigo-800 hover:bg-indigo-800 hover:text-white focus:ring-indigo-300 dark:border-indigo-600 dark:text-indigo-400 dark:hover:border-indigo-700 dark:hover:bg-indigo-700 dark:hover:text-white dark:focus:ring-indigo-800",
			lime: "border border-lime-700 text-lime-700 hover:border-lime-800 hover:bg-lime-800 hover:text-white focus:ring-lime-300 dark:border-lime-600 dark:text-lime-500 dark:hover:border-lime-700 dark:hover:bg-lime-700 dark:hover:text-white dark:focus:ring-lime-800",
			pink: "border border-pink-700 text-pink-700 hover:border-pink-800 hover:bg-pink-800 hover:text-white focus:ring-pink-300 dark:border-pink-600 dark:text-pink-500 dark:hover:border-pink-700 dark:hover:bg-pink-700 dark:hover:text-white dark:focus:ring-pink-800",
			purple: "border border-purple-700 text-purple-700 hover:border-purple-800 hover:bg-purple-800 hover:text-white focus:ring-purple-300 dark:border-purple-600 dark:text-purple-400 dark:hover:border-purple-700 dark:hover:bg-purple-700 dark:hover:text-white dark:focus:ring-purple-800",
			red: "border border-red-700 text-red-700 hover:border-red-800 hover:bg-red-800 hover:text-white focus:ring-red-300 dark:border-red-600 dark:text-red-500 dark:hover:border-red-700 dark:hover:bg-red-700 dark:hover:text-white dark:focus:ring-red-800",
			teal: "border border-teal-700 text-teal-700 hover:border-teal-800 hover:bg-teal-800 hover:text-white focus:ring-teal-300 dark:border-teal-600 dark:text-teal-400 dark:hover:border-teal-700 dark:hover:bg-teal-700 dark:hover:text-white dark:focus:ring-teal-800",
			yellow: "border border-yellow-400 text-yellow-400 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:border-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900",
		},
	},
	card: {
		root: {
			base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
			children: "flex h-full flex-col justify-center gap-4 p-6",
			horizontal: {
				off: "flex-col",
				on: "flex-col md:max-w-xl md:flex-row",
			},
			href: "hover:bg-gray-100 dark:hover:bg-gray-700",
		},
		img: {
			base: "",
			horizontal: {
				off: "rounded-t-lg",
				on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
			},
		},
	},
	dropdown: {
		arrowIcon: "ml-2 h-4 w-4",
		content: "py-1 focus:outline-none",
		floating: {
			animation: "transition-opacity",
			arrow: {
				base: "absolute z-10 h-2 w-2 rotate-45",
				style: {
					dark: "bg-gray-900 dark:bg-gray-700",
					light: "bg-white",
					auto: "bg-white dark:bg-gray-700",
				},
				placement: "-4px",
			},
			base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
			content: "py-1 text-sm text-gray-700 dark:text-gray-200",
			divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
			header: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
			hidden: "invisible opacity-0",
			item: {
				container: "",
				base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
				icon: "mr-2 h-4 w-4",
			},
			style: {
				dark: "bg-gray-900 text-white dark:bg-gray-700",
				light: "border border-gray-200 bg-white text-gray-900",
				auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
			},
			target: "w-fit",
		},
		inlineWrapper: "flex items-center",
	},
	input: {
		field: {
			input: {
				base: "block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
			},
		},
	},
	alert: {
		base: "flex flex-col gap-2 p-4 text-sm",
		borderAccent: "border-t-4",
		closeButton: {
			base: "-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2",
			icon: "h-5 w-5",
			color: {
				info: "bg-cyan-100 text-cyan-500 hover:bg-cyan-200 focus:ring-cyan-400 dark:bg-cyan-200 dark:text-cyan-600 dark:hover:bg-cyan-300",
				gray: "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
				failure:
					"bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300",
				success:
					"bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300",
				warning:
					"bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300",
				red: "bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300",
				green: "bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300",
				yellow: "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300",
				blue: "bg-blue-100 text-blue-500 hover:bg-blue-200 focus:ring-blue-400 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300",
				cyan: "bg-cyan-100 text-cyan-500 hover:bg-cyan-200 focus:ring-cyan-400 dark:bg-cyan-200 dark:text-cyan-600 dark:hover:bg-cyan-300",
				pink: "bg-pink-100 text-pink-500 hover:bg-pink-200 focus:ring-pink-400 dark:bg-pink-200 dark:text-pink-600 dark:hover:bg-pink-300",
				lime: "bg-lime-100 text-lime-500 hover:bg-lime-200 focus:ring-lime-400 dark:bg-lime-200 dark:text-lime-600 dark:hover:bg-lime-300",
				dark: "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-200 dark:text-gray-600 dark:hover:bg-gray-300",
				indigo: "bg-indigo-100 text-indigo-500 hover:bg-indigo-200 focus:ring-indigo-400 dark:bg-indigo-200 dark:text-indigo-600 dark:hover:bg-indigo-300",
				purple: "bg-purple-100 text-purple-500 hover:bg-purple-200 focus:ring-purple-400 dark:bg-purple-200 dark:text-purple-600 dark:hover:bg-purple-300",
				teal: "bg-teal-100 text-teal-500 hover:bg-teal-200 focus:ring-teal-400 dark:bg-teal-200 dark:text-teal-600 dark:hover:bg-teal-300",
				light: "bg-gray-50 text-gray-500 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white",
			},
		},
		color: {
			info: "border-cyan-500 bg-cyan-100 text-cyan-700 dark:bg-cyan-200 dark:text-cyan-800",
			gray: "border-gray-500 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
			failure: "border-red-500 bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800",
			success: "border-green-500 bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800",
			warning: "border-yellow-500 bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-800",
			red: "border-red-500 bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800",
			green: "border-green-500 bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800",
			yellow: "border-yellow-500 bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-800",
			blue: "border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-800",
			cyan: "border-cyan-500 bg-cyan-100 text-cyan-700 dark:bg-cyan-200 dark:text-cyan-800",
			pink: "border-pink-500 bg-pink-100 text-pink-700 dark:bg-pink-200 dark:text-pink-800",
			lime: "border-lime-500 bg-lime-100 text-lime-700 dark:bg-lime-200 dark:text-lime-800",
			dark: "border-gray-600 bg-gray-800 text-gray-200 dark:bg-gray-900 dark:text-gray-300",
			indigo: "border-indigo-500 bg-indigo-100 text-indigo-700 dark:bg-indigo-200 dark:text-indigo-800",
			purple: "border-purple-500 bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800",
			teal: "border-teal-500 bg-teal-100 text-teal-700 dark:bg-teal-200 dark:text-teal-800",
			light: "border-gray-400 bg-gray-50 text-gray-600 dark:bg-gray-500 dark:text-gray-200",
		},
		icon: "mr-3 inline h-5 w-5 shrink-0",
		rounded: "rounded-lg",
		wrapper: "flex items-center",
	},
	modal: {
		root: {
			base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
			show: {
				on: "flex bg-gray-900/50 dark:bg-gray-900/80",
				off: "hidden",
			},
			sizes: {
				sm: "max-w-sm",
				md: "max-w-md",
				lg: "max-w-lg",
				xl: "max-w-xl",
				"2xl": "max-w-2xl",
				"3xl": "max-w-3xl",
				"4xl": "max-w-4xl",
				"5xl": "max-w-5xl",
				"6xl": "max-w-6xl",
				"7xl": "max-w-7xl",
			},
			positions: {
				"top-left": "items-start justify-start",
				"top-center": "items-start justify-center",
				"top-right": "items-start justify-end",
				"center-left": "items-center justify-start",
				center: "items-center justify-center",
				"center-right": "items-center justify-end",
				"bottom-right": "items-end justify-end",
				"bottom-center": "items-end justify-center",
				"bottom-left": "items-end justify-start",
			},
		},
		content: {
			base: "relative h-full w-full p-4 md:h-auto",
			inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
		},
		body: {
			base: "flex-1 overflow-auto p-6",
			popup: "pt-0",
		},
		header: {
			base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
			popup: "border-b-0 p-2",
			title: "text-xl font-medium text-gray-900 dark:text-white",
			close: {
				base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
				icon: "h-5 w-5",
			},
		},
		footer: {
			base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
			popup: "border-t",
		},
	},
	fileInput: {
		base: "block w-full cursor-pointer rounded-lg border file:-ms-4 file:me-4 file:cursor-pointer file:border-none file:bg-gray-800 file:py-2.5 file:pe-4 file:ps-8 file:text-sm file:font-medium file:leading-[inherit] file:text-white hover:file:bg-gray-700 focus:outline-none focus:ring-1 dark:file:bg-gray-600 dark:hover:file:bg-gray-500",
		sizes: {
			sm: "text-xs",
			md: "text-sm",
			lg: "text-lg",
		},
		colors: {
			gray: "border-gray-300 bg-gray-50 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
			info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
			failure:
				"border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
			warning:
				"border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
			success:
				"border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
		},
	},
	hr: {
		root: {
			base: "my-8 h-px border-0 bg-gray-200 dark:bg-gray-700",
		},
		trimmed: {
			base: "mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 md:my-10 dark:bg-gray-700",
		},
		icon: {
			base: "inline-flex w-full items-center justify-center",
			hrLine: "my-8 h-1 w-64 rounded border-0 bg-gray-200 dark:bg-gray-700",
			icon: {
				base: "absolute left-1/2 -translate-x-1/2 bg-white px-4 dark:bg-gray-900",
				icon: "h-4 w-4 text-gray-700 dark:text-gray-300",
			},
		},
		text: {
			base: "inline-flex w-full items-center justify-center",
			hrLine: "my-8 h-px w-64 border-0 bg-gray-200 dark:bg-gray-700",
			text: "absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white",
		},
		square: {
			base: "mx-auto my-8 h-8 w-8 rounded border-0 bg-gray-200 md:my-12 dark:bg-gray-700",
		},
	},
	list: {
		root: {
			base: "list-inside space-y-1 text-gray-500 dark:text-gray-400",
			ordered: {
				off: "list-disc",
				on: "list-decimal",
			},
			horizontal: "flex list-none flex-wrap items-center justify-center space-x-4 space-y-0",
			unstyled: "list-none",
			nested: "mt-2 ps-5",
		},
		item: {
			withIcon: {
				off: "",
				on: "flex items-center",
			},
			icon: "me-2 h-3.5 w-3.5 shrink-0",
		},
	},
	tooltip: {
		target: "w-fit",
		animation: "transition-opacity",
		arrow: {
			base: "absolute z-10 h-2 w-2 rotate-45",
			style: {
				dark: "bg-gray-900 dark:bg-gray-700",
				light: "bg-white",
				auto: "bg-white dark:bg-gray-700",
			},
			placement: "-4px",
		},
		base: "absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm",
		hidden: "invisible opacity-0",
		style: {
			dark: "bg-gray-900 text-white dark:bg-gray-700",
			light: "border border-gray-200 bg-white text-gray-900",
			auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
		},
		content: "relative z-20",
	},
	spinner: {
		base: "inline animate-spin text-gray-200",
		color: {
			default: "fill-primary-600",
			failure: "fill-red-600",
			gray: "fill-gray-600",
			info: "fill-cyan-600",
			pink: "fill-pink-600",
			purple: "fill-purple-600",
			success: "fill-green-500",
			warning: "fill-yellow-400",
		},
		light: {
			off: {
				base: "dark:text-gray-600",
				color: {
					default: "",
					failure: "",
					gray: "dark:fill-gray-300",
					info: "",
					pink: "",
					purple: "",
					success: "",
					warning: "",
				},
			},
			on: {
				base: "",
				color: {
					default: "",
					failure: "",
					gray: "",
					info: "",
					pink: "",
					purple: "",
					success: "",
					warning: "",
				},
			},
		},
		size: {
			xs: "h-3 w-3",
			sm: "h-4 w-4",
			md: "h-6 w-6",
			lg: "h-8 w-8",
			xl: "h-10 w-10",
		},
	},
	floatingLabel: {
		input: {
			default: {
				filled: {
					sm: "peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-xs text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500",
					md: "peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500",
				},
				outlined: {
					sm: "peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-xs text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500",
					md: "peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500",
				},
				standard: {
					sm: "peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-xs text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500",
					md: "peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500",
				},
			},
			success: {
				filled: {
					sm: "peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-green-600 bg-gray-50 px-2.5 pb-2.5 pt-5 text-xs text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-500 dark:bg-gray-700 dark:text-white dark:focus:border-green-500",
					md: "peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-green-600 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-500 dark:bg-gray-700 dark:text-white dark:focus:border-green-500",
				},
				outlined: {
					sm: "peer block w-full appearance-none rounded-lg border border-green-600 bg-transparent px-2.5 pb-2.5 pt-4 text-xs text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-500 dark:text-white dark:focus:border-green-500",
					md: "peer block w-full appearance-none rounded-lg border border-green-600 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-500 dark:text-white dark:focus:border-green-500",
				},
				standard: {
					sm: "peer block w-full appearance-none border-0 border-b-2 border-green-600 bg-transparent px-0 py-2.5 text-xs text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-500 dark:text-white dark:focus:border-green-500",
					md: "peer block w-full appearance-none border-0 border-b-2 border-green-600 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-500 dark:text-white dark:focus:border-green-500",
				},
			},
			error: {
				filled: {
					sm: "peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-red-600 bg-gray-50 px-2.5 pb-2.5 pt-5 text-xs text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0 dark:border-red-500 dark:bg-gray-700 dark:text-white dark:focus:border-red-500",
					md: "peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-red-600 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0 dark:border-red-500 dark:bg-gray-700 dark:text-white dark:focus:border-red-500",
				},
				outlined: {
					sm: "peer block w-full appearance-none rounded-lg border border-red-600 bg-transparent px-2.5 pb-2.5 pt-4 text-xs text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0 dark:border-red-500 dark:text-white dark:focus:border-red-500",
					md: "peer block w-full appearance-none rounded-lg border border-red-600 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0 dark:border-red-500 dark:text-white dark:focus:border-red-500",
				},
				standard: {
					sm: "peer block w-full appearance-none border-0 border-b-2 border-red-600 bg-transparent px-0 py-2.5 text-xs text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0 dark:border-red-500 dark:text-white dark:focus:border-red-500",
					md: "peer block w-full appearance-none border-0 border-b-2 border-red-600 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0 dark:border-red-500 dark:text-white dark:focus:border-red-500",
				},
			},
		},
		label: {
			default: {
				filled: {
					sm: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 text-xs text-gray-500 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500",
					md: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 text-sm text-gray-500 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500",
				},
				outlined: {
					sm: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 px-2 text-xs text-gray-500 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500",
					md: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 px-2 text-sm text-gray-500 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500",
				},
				standard: {
					sm: "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-xs text-gray-500 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500",
					md: "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500",
				},
			},
			success: {
				filled: {
					sm: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 text-sm text-green-600 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-green-500",
					md: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 text-sm text-green-600 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-green-500",
				},
				outlined: {
					sm: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-green-600 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-green-500",
					md: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-green-600 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-green-500",
				},
				standard: {
					sm: "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-xs text-green-600 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-green-500",
					md: "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-green-600 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-green-500",
				},
			},
			error: {
				filled: {
					sm: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 text-xs text-red-600 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-red-500",
					md: "absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 text-xs text-red-600 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-red-500",
				},
				outlined: {
					sm: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-xs text-red-600 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-red-500",
					md: "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-xs text-red-600 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-red-500",
				},
				standard: {
					sm: "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-xs text-red-600 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-red-500",
					md: "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-red-600 transition-transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-red-500",
				},
			},
		},
	},
});
