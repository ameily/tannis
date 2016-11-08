

## Data Structures

### Changelog

A changelog is a dynamic object used to track changes to workstations and
devices. Each changelog entry has the following mandatory fields:

| Field | Type | Notes |
|-------|------|-------|
| date  | `DateTime` | Date the change took place. |
| userId | `ObjectId` | User who made the change. |

### Device Templates

Replaces the `DeviceTypes` table.

| Field | Type | Notes |
|-------|------|-------|
| name | `String` | |
| hasMacAddress | `Boolean` | Whether a MAC address is required. |
| hasSerialNumber | `Boolean` | Whether a serial number is required. |
| hasManufacturer | `Boolean` | Whether a manufacturer and model number is required. |
| hasCompanyTag | `Boolean` | Whether a company tag is required. |
| isTransferable | `Boolean` | Whether the device can be transfered from the workstation. This will be `true` for hardwired ethernet cards. |
| isContainer | `Boolean` | Whether the device can contain other devices. |
| customFields | `List<CustomField>` | List of custom fields available for the device. |
| changelog | `List<Chagelog>` | |


#### Custom Fields

| Field | Type | Notes |
|-------|------|-------|
| name | `String` | |
| isRequired | `Boolean` | Wether the custom field value is required. |
| regexPattern | `Regex` | Pattern that values must match (can be `null`) |

## Devices

| Field | Type | Notes |
|-------|------|-------|
| name | `String` | |
| templateId | `ObjectId` | Underlying template defining the custom fields. |
| ownerId | `ObjectId` | |
| parentId | `ObjectId` | Parent Device Id used for devices that contain other devices (ie. VMs in a workstation, NICs in a server, etc) |
| macAddress | `String` | can be null if template's `hasMacAddress` is `false`, otherwise a value is required. |
| serialNumber | `String` | can be null if template's `hasSerialNumber` is `false`, otherwise a value is required. |
| manufacturer | `String` | can be null if template's `hasManufacturer` is `false`, otherwise a value is required. |
| isContainer | `Boolean` | Whether the device can contain other devices. |
| model | `String` | can be null if template's `hasManufacturer` is `false`, otherwise a value is required. |
| companyTag | `String` | can be null if template's `hasCompanyTag` is `false`, otherwise a value is required. |
| customFields | `List<CustomFieldValue>` | |

### Custom Field Values

| Field | Type | Notes |
|-------|------|-------|
| name | `String` | |
| value | `String` | Can be null if `CustomField` is not required. |
