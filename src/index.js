import React from 'react';
import { isEqual } from 'lodash';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import '../src/chat.css';

const types = ['line', 'bar', 'radar', 'polarArea', 'pie', 'doughnut', 'bubble', 'scatter']

class index extends React.Component {
  componentWillMount () {
    this.chart = null;
  }

  componentDidMount () {
    this.onRenderChart();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { type, data, options, plugins, height, width } = this.props;
    if (height !== nextProps.height || width !== nextProps.width || type !== nextProps.type || !isEqual(nextProps.data, data) || !isEqual(nextProps.plugins, plugins) || !isEqual(nextProps.options, options)) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate (prevProps) {
    if (!isEqual(prevProps.data, this.props.data)) {
      const transform = (datasets, nextDatasets) => {
        datasets.splice(nextDatasets.length)
        nextDatasets.forEach((vo, key) => {
          if (datasets[key] && datasets[key] instanceof Object) {
            datasets[key] = {
              ...datasets[key],
              ...nextDatasets[key]
            }
          } else {
            datasets[key] = nextDatasets[key];
          }
        });
        return datasets
      }
      this.chart.config.data = {
         ...this.chart.config.data,
         labels: transform(this.chart.config.data.labels, this.props.data.labels),
         datasets: transform(this.chart.config.data.datasets, this.props.data.datasets)
      };
      this.chart.update();
    } else {
      this.onRenderChart();
    }
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  onRenderChart () {
    if (this.chart)
    this.chart.destroy()
    if (!types.includes(this.props.type)) return
    this.chart = new Chart(this.refs.canvas.getContext('2d'), {
      ...this.props
    })
  }

  render () {
    return (
    <canvas
      ref={'canvas'}
      className="chartjs"
      width={this.props.width}
      height={this.props.height}
      ></canvas>
    )
  }
}

index.propTypes = {
  data: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  options: PropTypes.object,
  plugins: PropTypes.arrayOf(PropTypes.object, PropTypes.func),
  type: PropTypes.oneOf(types)
}

index.defaultProps = {
  type: 'doughnut',
  height: 300,
  width: 300,
  data: {},
  options: {},
  plugins: [{}]
}

export default index
