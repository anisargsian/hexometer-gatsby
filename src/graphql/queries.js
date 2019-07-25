import { gql } from 'apollo-boost'

export const GET_TRANSLATIONS = gql`
  query {
    Keyword {
      getAll{
        en {
          key
          value
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query {
    User { 
      getMany {
        firstName
        lastName
        email
        createdAt
        verified
        verifyCode
      }
    }
  }
`;

export const SCAN_REQUEST_LOG = gql`
  query scanRequestLog($pageNumber: Int, $filterData: String) {
    ScanRequestLog {
      getMany(pageNumber: $pageNumber, filterData: $filterData) {
        total
        requestLogs {
          user {
              firstName
              lastName
              email
          }
          input
          tool
          createdAt
          ip
          fromExtension
        }
      }
    }
  }
`;

export const DAILY_METRICS = gql`
  query {
    Dashboard {
      metrics {
        usersCountToday
        scanCountToday
        totalUsersCount
        totalScanRequests
        totalActivatedUsers
      }
    }
  }
`;
