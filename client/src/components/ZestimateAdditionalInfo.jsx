import React from 'react';
import ComparableHomes from './ComparableHomes.jsx';
import LocalHomes from './LocalHomes.jsx';
import MarketAppreciation from './MarketAppreciation.jsx';
import ZestDeepDiveButton from './ZestDeepDiveButton.jsx';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faHome, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {
  AdditionalZestimateInformation, 
  ZestDeepDive, 
  ZestDeepDiveIntro,
  ZestDeepDiveIntroTitle,
  ZestDeepDiveIntroContent,
  ZestDeepDiveIntroEstimate,
  ZestDeepDiveCollapsible,
  ZestDeepDiveCollapsibleTitle, 
  ZestDeepDiveCollapsibleTitleText
} from '../style.js';

library.add(faHome, faCircle, faAngleDown);

class ZestimateAdditionalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHiddenComparableHomes: true,
      isHiddenMarketAppreciation: true,
      isHiddenLocalHomes: true
    };

  }

  toggleHiddenComparableHomes () {
    this.setState({
      isHiddenComparableHomes: !this.state.isHiddenComparableHomes
    });
  }

  toggleHiddenMarketAppreciation () {
    this.setState({
      isHiddenMarketAppreciation: !this.state.isHiddenMarketAppreciation
    });
  }

  toggleLocalHomes () {
    this.setState({
      isHiddenLocalHomes: !this.state.isHiddenLocalHomes
    });
  }

  render () {
    return (
      <div>
        <AdditionalZestimateInformation>
          <ZestDeepDive>
            <ZestDeepDiveIntro>
              <ZestDeepDiveIntroTitle>
              Inside the Zestimate
              </ZestDeepDiveIntroTitle>
              <ZestDeepDiveIntroContent>
                The Zestimate is Zillow’s best estimate of a home’s value. It is based on a blend of valuation methods, each of which may produce a different estimate depending on the available data.
              </ZestDeepDiveIntroContent>
            </ZestDeepDiveIntro>
            <ZestDeepDiveIntroEstimate>Estimate based on</ZestDeepDiveIntroEstimate>
            <ZestDeepDiveCollapsible>
              <ZestDeepDiveButton 
                name={'Comparable homes'} 
                estimate={`$${this.props.propertyData[this.props.propertyId].comparableHomePrice}`} 
                onClick={this.toggleHiddenComparableHomes.bind(this)}
              />
              {!this.state.isHiddenComparableHomes && 
                <ComparableHomes 
                  comparableHomesData={this.props.comparableHomesData} 
                  propertyData={this.props.propertyData}
                  photosData={this.props.photosData} 
                /> 
              }
              <ZestDeepDiveButton 
                name={'Market appreciation'} 
                estimate={`$${this.props.propertyData[this.props.propertyId].marketAppreciationPrice}`} 
                onClick={this.toggleHiddenMarketAppreciation.bind(this)}
              />
              {!this.state.isHiddenMarketAppreciation && 
                <MarketAppreciation 
                  marketAppreciationData={this.props.propertyData} 
                />
              }
              <ZestDeepDiveButton 
                name={'Local sale prices'}
                estimate={`$${this.props.propertyData[this.props.propertyId].comparableHomePrice}`} 
                onClick={this.toggleLocalHomes.bind(this)}
              />
              {!this.state.isHiddenLocalHomes && 
                <LocalHomes 
                  localHomesData={this.props.localHomesData} 
                  photosData={this.props.photosData} 
                  propertyId={this.props.propertyId}
                /> 
              }
            </ZestDeepDiveCollapsible>
          </ZestDeepDive>

        </AdditionalZestimateInformation>
      </div>
    );
  }
}

export default ZestimateAdditionalInfo; 