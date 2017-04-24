import PropTypes from 'prop-types';
import React from 'react';

import { prefix, splitBsProps, bsClass } from './utils/bootstrapUtils';
import Collapse from './Collapse';


const propTypes = {
  bsRole: PropTypes.string,
  /**
   * Callback fired before the component expands
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: PropTypes.func,
};

const defaultProps = {
  bsRole: 'panel-collapse',
};

const contextTypes = {
  $bs_panel: PropTypes.shape({
    getIds: PropTypes.func,
    bsClass: PropTypes.string,
    expanded: PropTypes.bool,
  })
};

class PanelCollapse extends React.Component {

  render() {
    const { children } = this.props;
    const { getIds, bsClass: _bsClass, expanded } = this.context.$bs_panel || {};

    const [bsProps, props] = splitBsProps(this.props);

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (getIds) {
      let { headingId, collapseId } = getIds();
      props.id = collapseId;
      props.role = props.role || 'tabpanel';
      props['aria-labelledby'] = headingId;
    }

    return (
      <Collapse in={expanded} {...props}>
        <div className={prefix(bsProps, 'collapse')}>
          { children }
        </div>
      </Collapse>
    );
  }
}

PanelCollapse.propTypes = propTypes;
PanelCollapse.defaultProps = defaultProps;
PanelCollapse.contextTypes = contextTypes;

export default bsClass('panel', PanelCollapse);
