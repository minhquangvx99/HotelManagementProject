import styled from 'styled-components';

export const FilterContainer = styled.div`
  background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
  box-shadow: 0px 0px 2px #888;
  .ant-input {
    height: 38px;
  }
  button {
    height: 44px;
    border-radius: 6px;
  }
  .ant-input-affix-wrapper-sm {
    padding: 0px 7px;
  }
  .ant-input&::placeholder {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
  .ant-btn::hover {
    border: '1px solid #194F9F';
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: fit-content;
    padding: 0px 10px !important;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-search {
    left: 10px;
  }
`;
export const TopicMainLayout = styled.div`
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: auto;
    padding: 3px 10px !important;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-search {
    left: 10px;
  }
  .dropdownActiveStatus {
    .ant-select-selector {
      height: 40px !important;
      width: 120px !important;
      background-color: #0075ff !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      height: 40px !important;
      width: 120px !important; /* Assuming you want to keep the width and other styles */
      background-color: #0075ff !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }
    .ant-select-selection-item {
      color: white !important;
      font-weight: 550 !important;
    }
  }

  .dropdownInActiveStatus {
    .ant-select-selector {
      height: 40px !important;
      width: 120px !important;
      background-color: #f0e68c !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      height: 40px !important;
      width: 120px !important; /* Assuming you want to keep the width and other styles */
      background-color: #f0e68c !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }
    .ant-select-selection-item {
      color: black !important;
      font-weight: 550 !important;
    }
  }

  .dropdownBlockedStatus {
    .ant-select-selector {
      height: 40px !important;
      width: 120px !important;
      background-color: #840000 !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    .ant-select-selection-item {
      color: white !important;
      font-weight: 550 !important;
    }
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 40px !important;
  }
  /* .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 40px !important;
    width: 120px !important;
  } */
`;
export const StyledAddTopic = styled.div`
  .statusStyleActive {
    width: 100% !important;
    .ant-select-selector {
      width: 100% !important;
      background-color: #0075ff !important;
      text-align: center !important;
      .ant-select-selection-item {
        color: white !important;
        font-weight: 550 !important;
      }
    }
  }
  span.ant-select-selection-placeholder {
    font-weight: normal !important;
  }
  .GfBDy .ant-select.statusStyleActive .ant-select-arrow svg {
    fill: white !important; /* Change this to your desired fill color */
  }

  .statusStyleInactive {
    width: 100% !important;
    .ant-select-selector {
      width: 100% !important;
      background-color: #f0e68c !important;
      text-align: center !important;
      .ant-select-selection-item {
        color: black !important;
        font-weight: 550 !important;
      }
    }
  }
  .GfBDy .ant-select.statusStyleInactive .ant-select-arrow svg {
    fill: black !important; /* Change this to your desired fill color */
  }

  .statusStyleBlocked {
    width: 100% !important;
    .ant-select-selector {
      width: 100% !important;
      background-color: #840000 !important;
      text-align: center !important;
      .ant-select-selection-item {
        color: white !important;
        font-weight: 550 !important;
      }
    }
  }
  .statusStyleRefuse {
    width: 100% !important;
    .ant-select-selector {
      width: 100% !important;
      background-color: red !important;
      text-align: center !important;
      .ant-select-selection-item {
        color: white !important;
        font-weight: 550 !important;
      }
    }
  }
  .ant-select-arrow svg {
    fill: black !important; /* Change this to your desired fill color */
  }

  .statusStyleNormal {
    width: 100% !important;
    .ant-select-selector {
      width: 100% !important;
      text-align: center !important;
      .ant-select-selection-item {
        color: black !important;
        font-weight: 550 !important;
      }
    }
  }

  .dropdownCode {
    /* width: 50% !important; */
    .ant-select-selector {
      text-align: center !important;
    }
  }

  .dropdownTaskFilter {
    width: 100% !important;
    .ant-select-selector {
      text-align: center !important;
    }
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    /* width: 100% !important; */
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .custom-select-border .ant-select-selector {
    border-color: red !important;
  }

  .custom-select-border .ant-table-container {
    border-color: red !important; /* Change 'red' to your desired color */
    border-width: 1px !important;
    border-style: solid !important;
  }

  .dropdownCode .ant-select-selector {
    border-color: rgb(227, 230, 239) !important;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-search {
    left: 15px;
  }
`;
export const StyledFilterTopic = styled.div`
  .ant-card-body {
    padding: 10px 25px !important;
  }
  .ant-form-item {
    margin-bottom: 14px;
  }
`;
