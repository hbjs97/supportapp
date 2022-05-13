import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";

export const AddressListResults = ({ addresses, onClick, onClose }) => {
  return (
    <Card>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.map((address) => (
                <TableRow
                  hover
                  key={address.id}
                  onClick={() => {
                    onClick({ address: address.address_name, x: address.x, y: address.y });
                    onClose();
                  }}
                >
                  <TableCell>{address.place_name}</TableCell>
                  <TableCell>{address.address_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

AddressListResults.propTypes = {
  addresses: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
