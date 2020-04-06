<script>
import { mergeData } from "vue-functional-data-merge";

const Shared = ["start", "end", "center"];
const JustifyContent = Shared.concat(["between", "around"]);
const AlignItems = Shared.concat(["baseline", "stretch"]);
const AlignAxes = Shared.concat(["between", "baseline", "stretch"]);

function boolPropFactory() {
	const props = {};
	for (let i = 0, len = arguments.length; i < len; i++) {
		props[arguments[i]] = { type: Boolean, default: false };
	}
	return props;
}

export const props = Object.assign(
	boolPropFactory(
		"inline",
		"column",
		"reverse",
		"noWrap",
		"wrapReverse",
    "grow"
	),
	{
		tag: {
			type: String,
			default: "div",
		},
		justify: {
			type: String,
			default: null,
			validator: type => JustifyContent.indexOf(type) !== -1,
		},
		align: {
			type: String,
			default: null,
			validator: type => AlignItems.indexOf(type) !== -1,
		},
		// Cannot prefix with `v` because it's parsed as directive.
		alignH: {
			type: String,
			default: null,
			validator: type => AlignAxes.indexOf(type) !== -1,
		},
		// Cannot prefix with `v` because it's parsed as directive.
		alignV: {
			type: String,
			default: null,
			validator: type => AlignAxes.indexOf(type) !== -1,
    },
    cols: {
      type: Number,
      default: 2,
    }
	}
);

export default {
	functional: true,
	props,
	render(h, { props, data, children }) {
		let componentData = { class: [] };
		let classObj = {};
		let hAxis = "justify-content",
			hProp = "justify",
			vAxis = "align-items",
			vProp = "align";

		if (props.column) {
			hAxis = "align-items";
			hProp = "align";
			vAxis = "justify-content";
			vProp = "justify";
		}

		componentData.class.push(`vf__flex${props.inline ? "--inline" : ""}`);
		componentData.class.push(
			`vf__flex-dir--${props.column ? "column" : "row"}${
				props.reverse ? "-reverse" : ""
			}`
		);
    componentData.class.push(classObj);
    if(props.cols) {
      componentData.class.push(`vf__col${props.cols}`);
    }

		classObj[
			`vf__flex-wrap${props.wrapReverse ? "-reverse" : ""}`
		] = !props.noWrap;
		classObj[`vf__flex-nowrap`] = props.noWrap;
		classObj[`vf__grow-children`] = props.grow;
		classObj[`vf__justify-content-${props.justify}`] = props.justify;
		classObj[`vf__align-items-${props.align}`] = props.align;
		classObj[`vf__${hAxis}-${props.alignH}`] = props.alignH && !props[hProp];
		classObj[`vf__${vAxis}-${props.alignV}`] = props.alignV && !props[vProp];

		return h(props.tag, mergeData(data, componentData), children);
	},
};
</script>

<style>
  .vf__flex {
    display: flex;
  }

  .vf__flex--inline {
    display: inline-flex;
  }

  .vf__flex-dir--row {
    flex-direction: row;
  }

  .vf__flex-dir--column {
    flex-direction: column;
  }

  .vf__flex-dir--row-reverse {
    flex-direction: row-reverse;
  }

  .vf__flex-dir--column-reverse {
    flex-direction: column-reverse;
  }

  .vf__flex-wrap {
    flex-wrap: wrap;
  }

  .vf__flex-nowrap {
    flex-wrap: nowrap;
  }

  .vf__flex-wrap-reverse {
    flex-wrap: wrap-reverse;
  }

  .vf__justify-content-start {
    justify-content: flex-start;
  }

  .vf__justify-content-end {
    justify-content: flex-end;
  }

  .vf__justify-content-center {
    justify-content: center;
  }

  .vf__justify-content-between {
    justify-content: space-between;
  }

  .vf__justify-content-around {
    justify-content: space-around;
  }

  .vf__align-items-start {
    align-items: flex-start;
  }

  .vf__align-items-end {
    align-items: flex-end;
  }

  .vf__align-items-center {
    align-items: center;
  }

  .vf__align-items-baseline {
    align-items: baseline;
  }

  .vf__align-items-stretch {
    align-items: stretch;
  }

  .vf__align-content-start {
    align-content: flex-start;
  }

  .vf__align-content-end {
    align-content: flex-end;
  }

  .vf__align-content-center {
    align-content: center;
  }

  .vf__align-content-between {
    align-content: space-between;
  }

  .vf__align-content-around {
    align-content: space-around;
  }

  .vf__align-content-stretch {
    align-content: stretch;
  }

  .vf__align-self-auto {
    align-self: auto;
  }

  .vf__align-self-start {
    align-self: flex-start;
  }

  .vf__align-self-end {
    align-self: flex-end;
  }

  .vf__align-self-center {
    align-self: center;
  }

  .vf__align-self-baseline {
    align-self: baseline;
  }

  .vf__align-self-stretch {
    align-self: stretch;
  }
  .vf__col2 > * {
    flex: 1 1 50%;
  }

  .vf__col3 > * {
    flex: 1 1 33,333333%;
  }

  .vf__col4 > * {
    flex: 1 1 25%;
  }

  .vf__grow-children > * {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
  }
</style>