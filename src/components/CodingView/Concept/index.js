import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import 'brace/theme/monokai';

import Grid from 'components/Grid';
import GridItem from 'components/Grid/GridItem';
import CodeWidget from 'components/Widgets/CodeWidget';
import TestWidget from 'components/Widgets/TestWidget';
import TapeWidget from 'components/Widgets/TapeWidget';

import debouncedRunCode from 'utils/runCode';
import { JAVASCRIPT as GRID_LABEL_JAVASCRIPT } from 'utils/gridLabel';

import styles from './ConceptPage.module.scss';

class ConceptPage extends Component {
  static propTypes = {
    code: PropTypes.string,
    compiledCode: PropTypes.string,
    test: PropTypes.string,
    tape: PropTypes.array,
    handleCodeChange: PropTypes.func,
    wrappedConsole: PropTypes.object,
    resetConsole: PropTypes.func,
    addTape: PropTypes.func,
    resetTape: PropTypes.func,
  };

  controlHeight = 70;

  componentDidMount() {
    const { compiledCode, wrappedConsole, resetConsole, addTape } = this.props;
    resetConsole();
    debouncedRunCode({
      code: compiledCode,
      wrappedConsole,
      onTapeUpdate: addTape,
    });
  }

  shouldComponentUpdate(nextProps) {
    const {
      compiledCode: previousCompiledCode,
      resetConsole,
      addTape,
      resetTape,
    } = this.props;
    const { compiledCode, wrappedConsole } = nextProps;
    if (previousCompiledCode !== compiledCode) {
      resetConsole();
      resetTape();
      debouncedRunCode({
        code: compiledCode,
        wrappedConsole,
        onTapeUpdate: addTape,
      });
    }
    return true;
  }

  render() {
    const { code, test, handleCodeChange, tape } = this.props;
    const layout = [
      {
        key: 'code',
        x: 0,
        y: 0,
        width: window.innerWidth / 2 + 50,
        height: window.innerHeight / 2 + 100,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500,
      },
      {
        key: 'test',
        x: 0,
        y: 1,
        width: window.innerWidth / 2 + 50,
        height: window.innerHeight / 2 - 150,
        minWidth: 100,
        maxWidth: 700,
      },
      {
        key: 'tape',
        x: 1,
        y: 0,
        width: window.innerWidth / 2 - 50,
        height: window.innerHeight / 2,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500,
      },
    ];
    return (
      <div className={styles.app}>
        <Grid layout={layout} totalWidth="100%" totalHeight="100%" autoResize>
          <GridItem key="code" label={GRID_LABEL_JAVASCRIPT.code}>
            <CodeWidget
              handleCodeChange={handleCodeChange}
              data={code}
              mode="javascript"
              theme="monokai"
            />
          </GridItem>
          <GridItem key="test" label={GRID_LABEL_JAVASCRIPT.test}>
            <TestWidget data={test} />
          </GridItem>
          <GridItem key="tape" label={GRID_LABEL_JAVASCRIPT.tape}>
            <TapeWidget data={tape} />
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withRouter(ConceptPage);
