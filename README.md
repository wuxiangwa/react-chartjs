# react-chartjs
>Chartjs component is based on [chart.js](http://www.chartjs.org) for React

## Installation

```bash
npm install react-bulma-chartjs --save
```

## Usage

```jsx
import Chart from 'react-bulma-chartjs';

const data =  {
      labels: [
        'Red', 'Green', 'Yellow'
      ],
      datasets: [
        {
          data: [
            300, 50, 100
          ],
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56'
          ],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };
const options = {
      animateRotate: true
    };

const App => () =>
  <div>
      // doughnut
      <Chart type={'doughnut'} data={data} options={options}/>

      // pie
        <Chart type={'pie'} data={data} options={options}/>
  </div>

export default App
```

### Chart type
- `bar`
- `doughnut`
- `line`
- `pie`
- `polarArea`
- `radar`
- `scatter`
- `bubble`
