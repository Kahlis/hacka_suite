export const BooleanRecordView = ({
  record,
}: {
  record: Record<string, boolean>;
}) => {
  return (
    <div className="boolean-record-view">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(record).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {value ? (
                  <span className="true-value">✓ True</span>
                ) : (
                  <span className="false-value">✗ False</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
