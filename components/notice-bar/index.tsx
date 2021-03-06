/* tslint:disable:no-switch-case-fall-through */
import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import NoticeStyle from './style';
import NoticeBarProps from './PropsType';

export default class NoticeBar extends React.Component<NoticeBarProps, any> {
  static defaultProps = {
    mode: '',
    onClick() {},
  };

  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  onClick = () => {
    const { mode, onClick } = this.props;
    if (onClick) {
      onClick();
    }
    if (mode === 'closable') {
      this.setState({
        show: false,
      });
    }
  }

  render() {
    const { children, mode, type, style } = this.props;

    let operationDom: any = null;
    if (mode === 'closable') {
      operationDom = (
        <TouchableWithoutFeedback onPress={this.onClick}>
          <View><Text style={[NoticeStyle.close]}>×</Text></View>
        </TouchableWithoutFeedback>
      );
    } else if (mode === 'link') {
      operationDom = (
        <Text style={[NoticeStyle.link]}>∟</Text>
      );
    }

    const iconEnum = {
      success: 'dHVDErPWEJtMlmn',
      error: 'LvckcvVesFNgvpV',
      warn: 'bRnouywfdRsCcLU',
      question: 'JNRDCOIzgNJGnZt',
    };

    const iconDom = type ? <View style={[NoticeStyle.left15]}>
      <Image
        source={{uri: `https://zos.alipayobjects.com/rmsportal/${iconEnum[type] || 'baPKdUnrQFvLyHS'}.png`}}
        style={{ width: 12, height:12 }} />
    </View> : null;

    const main = (
      <View style={[NoticeStyle.notice, style]}>
        {iconDom}
        <Text style={[NoticeStyle.content, type ? NoticeStyle.left6 : NoticeStyle.left15]}>{children}</Text>
        {operationDom}
      </View>
    );
    return this.state.show ? mode === 'closable' ? main : (<TouchableWithoutFeedback onPress={this.onClick}>
        {main}
      </TouchableWithoutFeedback>) : null;
  }
}
